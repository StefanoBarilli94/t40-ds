// Standalone WCAG audit for every Storybook story, using axe-core directly via
// Playwright against the running Storybook dev server (bun run storybook).
//
// Why this exists: @storybook/addon-vitest's browser-mode test runner currently
// crashes on import ("does not provide an export named 'elementRoles'") due to
// an aria-query/Vite ESM interop bug that persists across aria-query 5.1.3,
// 5.3.0 and 5.3.2. Until that's fixed upstream, this script is the accessibility
// gate. The interactive Accessibility panel in Storybook itself (per-story,
// axe-core based) is unaffected and works fine for manual spot-checks.
//
// Usage: bun run a11y  (storybook must already be running on :6006)

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const axeSource = fs.readFileSync(
  path.join(__dirname, "..", "node_modules", "axe-core", "axe.min.js"),
  "utf8",
);

const indexRes = await fetch("http://localhost:6006/index.json");
const index = await indexRes.json();
const stories = Object.values(index.entries).filter((e) => e.type === "story");

const browser = await chromium.launch();
const page = await browser.newPage();

let totalViolations = 0;
const report = [];

for (const story of stories) {
  const url = `http://localhost:6006/iframe.html?id=${story.id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(300);
    await page.evaluate(axeSource);
    const results = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      return await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
    });
    if (results.violations.length > 0) {
      totalViolations += results.violations.length;
      report.push({
        id: story.id,
        title: story.title,
        name: story.name,
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          targets: v.nodes.map((n) => n.target.join(" ")).slice(0, 3),
        })),
      });
    }
  } catch (err) {
    report.push({ id: story.id, title: story.title, name: story.name, error: String(err) });
  }
}

await browser.close();

console.log(
  `\n=== ${stories.length} stories checked, ${totalViolations} total violations, ${
    report.filter((r) => r.error).length
  } errors ===\n`,
);
if (report.length > 0) console.log(JSON.stringify(report, null, 2));

process.exit(totalViolations > 0 || report.some((r) => r.error) ? 1 : 0);
