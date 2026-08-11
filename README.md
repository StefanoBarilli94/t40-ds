# Tabaccheria 4.0 — Design System

Libreria di componenti UI per applicazioni web nel settore della vendita di tabacchi.
51 componenti (shadcn/ui su Radix UI), documentati con Storybook, verificati WCAG 2.1 AA,
con supporto multi-tema per brand diversi.

## Sviluppo

```bash
bun install
bun run dev          # demo app su :5173
bun run storybook    # documentazione componenti su :6006
bun run a11y         # audit accessibilità su tutte le story (storybook deve essere avviato)
bun run build         # build della demo app (sanity check)
```

## Usarlo in un'app consumer

Installato come dipendenza Git (nessun registro npm da gestire), puntata a un tag di versione:

```bash
bun add github:StefanoBarilli94/t40-ds#v0.7.0
```

```ts
import { Button, Card, Input } from "@tabaccheria/design-system";
import "@tabaccheria/design-system/src/index.css"; // token colore/radius — una volta in main.tsx
```

Il pacchetto è distribuito come sorgente TypeScript (nessuno step di build): l'app consumer lo
compila con il proprio Vite/TypeScript. Perché le classi Tailwind dei componenti vengano
generate, aggiungi il pacchetto allo scan di Tailwind nel tuo `index.css`:

```css
@source "../node_modules/@tabaccheria/design-system/src";
```

## Aggiornare la versione

```bash
git tag v0.7.1 && git push origin v0.7.1
```

Poi negli app consumer: `bun add github:StefanoBarilli94/t40-ds#v0.7.1`.

## Note

- Angoli squadrati e nessuna ombra ovunque — vedi `src/index.css`.
- Testi in **sentence case**, mai maiuscolo integrale: vedi
  `agent_docs/component-conventions.md`.
- `bun run a11y` è un sostituto funzionante dell'integrazione ufficiale
  `@storybook/addon-vitest`, che ha un bug upstream irrisolto (crash import per
  un'incompatibilità ESM/CJS di `aria-query` con Vite, riprodotta su più versioni del pacchetto).
