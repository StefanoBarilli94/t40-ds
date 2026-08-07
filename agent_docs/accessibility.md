# Accessibilità

Obiettivo: **WCAG 2.1 AA** su ogni componente, non come eccezione ma come requisito di
base — nessuna story va aggiunta/mergiata con violazioni note.

## Come verificare

```bash
bun run storybook   # deve restare avviato
bun run a11y         # in un altro terminale
```

`scripts/a11y-audit.mjs` lancia axe-core via Playwright direttamente sull'`iframe.html`
di ogni story (bypassa Storybook e il suo indexing). Uscita 0 = nessuna violazione,
uscita 1 = violazioni trovate (stampate come JSON con id, impatto, nodi coinvolti).

**Perché non l'integrazione ufficiale**: `@storybook/addon-vitest` (il test runner
browser-mode di Storybook) crasha all'import con `aria-query` — un'incompatibilità
ESM/CJS con Vite riprodotta identica su tre versioni diverse del pacchetto (5.1.3, 5.3.0,
5.3.2). Il pannello Accessibility interattivo di Storybook (in basso in ogni story)
funziona comunque per ispezione manuale — solo la pipeline CLI/CI è rotta a monte.

## Pattern già stabiliti (non reinventare)

- Icon-only button/toggle → `aria-label` obbligatorio.
- Radix `Slider`: l'`aria-label` sul `Root` non arriva al `Thumb` (l'elemento con
  `role="slider"`) — va passato esplicitamente a ogni Thumb (vedi `slider.tsx`).
- `ScrollArea`: il viewport ha `tabIndex={0}` così è raggiungibile da tastiera quando il
  contenuto overflow-a.
- Form field con errore: `aria-invalid` + `aria-describedby` verso il messaggio, non solo
  colore rosso.
- Colore mai unico veicolo d'informazione (badge Aggio/Spesa hanno sempre testo).

## Quando trovi una violazione

Fixala nel componente sorgente, non nella story — se una story la nasconde (es. non
mostra lo stato che la causa), la violazione resta per chi usa il componente in modo
diverso in ast40/gt40.

## Canvas (Chart.js) e a11y

Un `<canvas>` Chart.js riceve `role="img"` di default ma **nessun nome accessibile** —
axe lo segnala (`role-img-alt`) appena una story lo renderizza per davvero. Due livelli
di rimedio, entrambi da usare insieme quando il grafico è l'unica fonte del dato:
- `aria-label` sul componente `react-chartjs-2` (`<Bar aria-label="..." .../>`), minimo
  indispensabile.
- `ChartAccessibleTable` (`chart.tsx`) + `aria-hidden="true"` sul `ChartContainer`: un
  canvas non espone NULLA a uno screen reader (a differenza dell'SVG di Recharts, che
  almeno aveva nodi DOM ispezionabili) — l'unico modo per dare accesso ai dati veri è
  una tabella parallela, non un'etichetta.

## Falso positivo da non rincorrere: animazioni bloccate a metà

Se stai testando un overlay animato (Sheet, Dialog, Drawer) in un browser/tab non
visibile o non compositato (`document.hidden === true`), l'animazione CSS resta bloccata
a metà — l'elemento sembra fuori schermo nonostante `data-state="open"`. Non è un bug:
il browser rallenta le animazioni sui tab in background. Verifica forzando
`document.getAnimations().forEach(a => a.finish())` e rimisurando la posizione prima di
concludere che c'è un problema reale (trovato mentre si verificava la #12).
