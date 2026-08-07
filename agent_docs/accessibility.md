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
