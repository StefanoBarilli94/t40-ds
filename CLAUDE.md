# T40 DS — Tabaccheria 4.0 Design System

## What

Libreria di componenti UI (shadcn/ui su Radix UI) condivisa tra le app web del gruppo
Tabaccheria 4.0. React 19 + TypeScript + Tailwind v4 + Vite. Documentata con Storybook
("T40 DS"). Nessuno step di build: distribuita come sorgente TS, i consumer la compilano
con il proprio bundler.

Struttura:
- `src/components/ui/*.tsx` — componenti, uno per file, con `*.stories.tsx` a fianco.
- `src/index.css` — unica fonte dei design token (colori, radius, font).
- `src/index.ts` — barrel export pubblico del pacchetto.
- `src/docs/*.mdx` — pagine Storybook non legate a un componente (Introduzione, Fondamenta).
- `scripts/a11y-audit.mjs` — audit di accessibilità (vedi agent_docs/accessibility.md).

## Why

Le app consumer duplicavano gli stessi componenti UI con copie che divergevano nel tempo.
Questo repo è l'unica fonte di verità: ogni componente deve restare **WCAG 2.1 AA** e
funzionare identico ovunque venga installato (git dependency, non npm registry).

## How

```bash
bun install
bun run storybook   # :6006 — sviluppo/documentazione componenti
bun run a11y        # audit accessibilità (storybook deve essere già avviato)
bun run dev          # :5173 — demo app minimale, solo per sanity check locale
bun run build         # build della demo app (non del pacchetto: non c'è build step)
```

Rilascio nuova versione: `git tag vX.Y.Z && git push origin vX.Y.Z`, poi negli app
consumer `bun add github:StefanoBarilli94/t40-ds#vX.Y.Z`.

Tutto il lavoro (bugfix, feature, refactor) va tracciato come issue su
[github.com/StefanoBarilli94/t40-ds/issues](https://github.com/StefanoBarilli94/t40-ds/issues),
non solo in una todo-list di sessione.

## Prima di modificare un componente

Leggi `agent_docs/component-conventions.md` — contiene un vincolo non ovvio (import
relativi, non alias `@/`) che se ignorato rompe silenziosamente il pacchetto una volta
installato altrove.

## Approfondimenti (agent_docs/)

- `component-conventions.md` — pattern dei componenti, l'insidia degli import `@/`, le
  eccezioni `data-slot` alla regola "niente angoli arrotondati".
- `theming.md` — sistema multi-tema (AST40/GT40), token oklch, come aggiungere un colore.
- `accessibility.md` — requisito AA, come/perché `bun run a11y` esiste (bug upstream di
  `@storybook/addon-vitest`).
- `storybook-conventions.md` — struttura delle story, tassonomia Atom/Form/Pattern.
