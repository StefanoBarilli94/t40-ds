import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  "staticDirs": ["../public"],
  "managerHead": (head) => `
    ${head}
    <link rel="icon" type="image/png" href="/brand/logo-dark.png" />
    <title>T40 DS</title>
    <style>
      /* Il logo sorgente (768x763) riempie l'intero box brand di Storybook
         (max-height 100px di default) — troppo grande accanto al titolo
         "T40 DS" nella sidebar (issue #16). Vincolato a un'altezza da icona. */
      .sidebar-header img[alt="T40 DS"] {
        max-height: 28px;
        width: auto;
      }
    </style>
  `
};
export default config;