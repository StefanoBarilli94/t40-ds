# Theming multi-brand

Due temi, stesso set di componenti:

- **GT40** (default) — nessun attributo, è il `:root` in `src/index.css`. Palette
  menta/teal originale.
- **AST40** — `data-theme="ast40"` sull'elemento root. Colori estratti dal logo T40
  (`public/brand/logo-*.png`): rosso al posto del teal come colore di brand.

In Storybook si cambia dalla toolbar (vedi `.storybook/preview.tsx`, `globalTypes.theme`
+ decorator che applica `data-theme`). In un'app consumer, applicare
`data-theme="ast40"` (o niente, per GT40) sull'elemento che avvolge l'app.

## Regola sui token

Tutti i colori sono **oklch**, mai hex/rgb — coerenza percettiva e possibilità di
calcolare il contrasto via formula (vedi sotto). Un tema override (come `[data-theme="ast40"]`)
ridefinisce solo i token di brand (`--primary`, `--accent`, `--ring`, `--sidebar-primary*`),
non i neutri (background/foreground/card/muted) — quelli restano condivisi tra temi per
non dover raddoppiare ogni decisione di layout/contrasto.

## Contrasto: verificalo, non stimarlo

Ogni nuovo colore usato come testo (non solo come sfondo con un foreground dedicato) va
verificato contro WCAG 2.1 AA (4.5:1 per testo normale) **prima** di committarlo. Il modo
più veloce: conversione oklch → sRGB lineare → luminanza relativa, poi la formula di
contrasto standard. Non indovinare la lightness a occhio: `--positive`/`--negative`
originali (ereditati da ast40) erano a 2.4:1 e ~3.9:1, sotto soglia, e sono stati scoperti
solo calcolando i numeri.

Se un colore serve sia come **sfondo** (con un foreground ad alto contrasto proprio) sia
come **testo su sfondo chiaro** (link, ecc.), servono due token distinti — vedi
`--primary` vs `--primary-text` in `index.css` come esempio: la stessa tinta, lightness
diversa, perché i requisiti di contrasto sono opposti nei due casi.

## Audit automatico

`bun run a11y` verifica tutte le story con axe-core — coglie i problemi di contrasto reali
(compreso il rendering effettivo dei componenti, non solo i token teorici). Vedi
`agent_docs/accessibility.md`.

## Trappola: `var(--primary)`, mai `var(--color-primary)`

Tailwind (`@theme inline` in `index.css`) genera un alias `--color-<token>: var(--<token>)`
per ogni token (es. `--color-primary: var(--primary)`), dichiarato **una sola volta su
`:root`**. Un discendente con `[data-theme="ast40"]` che ridefinisce `--primary` NON fa
ricalcolare `--color-primary`: l'inheritance passa il *computed value* del genitore, non
lo *specified value* da rivalutare — `--color-primary` resta congelato al valore di
`:root` (GT40) per chiunque legga `var(--color-primary)` in un discendente, anche dentro
uno scope AST40. Solo il token raw (`--primary`) cascata correttamente sui temi annidati.

Bug reale trovato due volte nello stesso modo: prima in `Fondamenta/Colori.mdx` (i due
temi risultavano visivamente identici), poi nella configurazione di un grafico
(`color: "var(--color-primary)"` in una story — il grafico non seguiva il tema AST40;
quel componente è poi stato rimosso con la #27, ma il bug non dipendeva da lui).
In entrambi i casi il fix è lo stesso: usare `var(--primary)` (o `var(--chart-1)`, ecc.),
mai l'alias `--color-*`. Le utility class Tailwind generate (`bg-primary`, `text-primary`)
NON hanno questo problema — `@theme inline` le fa compilare per riferire direttamente
`var(--primary)`, saltando l'alias; il bug colpisce solo chi legge `var(--color-*)` a
mano in CSS/JS (inline style, markup MDX).
