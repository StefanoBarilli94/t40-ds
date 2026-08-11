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
      /* Il brand della sidebar e' markup nostro dentro brandTitle (issue #37):
         il manager di Storybook non carica il CSS del design system, quindi gli
         stili di quel blocco stanno qui. */
      .t40-brand {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      /* Il logo sorgente (768x763) riempie l'intero box brand di Storybook
         (max-height 100px di default) — troppo grande accanto al nome nella
         sidebar (issue #16). Vincolato a un'altezza da icona. */
      .t40-brand__logo {
        max-height: 28px;
        width: auto;
      }
      .t40-brand__text {
        display: inline-flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .t40-brand__name {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.1em;
      }
      /* Dato di servizio, non una voce di navigazione: piu' piccolo e attenuato
         del nome. Opacity e non un colore fisso, cosi' segue il tema del
         manager invece di inseguirlo. */
      .t40-brand__version {
        font-size: 11px;
        opacity: 0.65;
      }
    </style>
  `
};
export default config;