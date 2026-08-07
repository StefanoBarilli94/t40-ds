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
  `
};
export default config;