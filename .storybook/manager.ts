import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import { version } from "../package.json";

// Il brand della sidebar deve dire *quale* versione del DS si sta guardando
// (issue #37): le app consumer puntano a un tag fisso, senza il numero qui il
// confronto con quello che hanno in package.json non si puo' fare a occhio.
//
// Perche' non un addon di manager: Storybook 10 ha rimosso dall'enum dei tipi
// gli slot `experimental_SIDEBAR_TOP` / `SIDEBAR_BOTTOM`, quella strada non
// esiste piu'. Resta questa, supportata: con `brandImage` assente Storybook
// renderizza `brandTitle` dentro il link del logo via dangerouslySetInnerHTML,
// quindi logo, nome e versione stanno tutti li' dentro. Gli stili sono in
// `managerHead` (main.ts) — il manager non carica il CSS del DS.
addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: `
      <span class="t40-brand">
        <img class="t40-brand__logo" src="/brand/logo-dark.png" alt="" />
        <span class="t40-brand__text">
          <span class="t40-brand__name">T40 DS</span>
          <span class="t40-brand__version">v.${version}</span>
        </span>
      </span>
    `,
    brandUrl: "?path=/docs/introduzione--docs",
    brandTarget: "_self",
  }),
});
