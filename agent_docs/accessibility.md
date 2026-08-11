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
- `ScrollArea`: il viewport ha `tabIndex={0}` così è raggiungibile da tastiera quando il
  contenuto overflow-a.
- Form field con errore: `aria-invalid` + `aria-describedby` verso il messaggio, non solo
  colore rosso.
- Colore mai unico veicolo d'informazione: sempre affiancato da testo o icona.
- Testi in sentence case, mai maiuscolo integrale: il maiuscolo elimina il profilo
  variabile delle parole e rallenta la lettura (vedi `component-conventions.md`).

## Quando trovi una violazione

Fixala nel componente sorgente, non nella story — se una story la nasconde (es. non
mostra lo stato che la causa), la violazione resta per chi usa il componente in modo
diverso in ast40/gt40.

## Se un giorno tornasse un grafico

`Chart` (Chart.js) è stato rimosso con la #27 perché nessuna app lo usava, ma la lezione
va tenuta: un `<canvas>` riceve `role="img"` di default e **nessun nome accessibile**, e
soprattutto non espone NULLA del proprio contenuto a uno screen reader. Un `aria-label`
è il minimo indispensabile ma non basta quando il grafico è l'unica fonte del dato:
serve una **tabella parallela** con gli stessi numeri, più `aria-hidden="true"` sul
canvas. Non è un dettaglio da aggiungere dopo: cambia la struttura del componente.

## Falso positivo da non rincorrere: animazioni bloccate a metà

Se stai testando un overlay animato (Sheet, Dialog, Drawer) in un browser/tab non
visibile o non compositato (`document.hidden === true`), l'animazione CSS resta bloccata
a metà — l'elemento sembra fuori schermo nonostante `data-state="open"`. Non è un bug:
il browser rallenta le animazioni sui tab in background. Verifica forzando
`document.getAnimations().forEach(a => a.finish())` e rimisurando la posizione prima di
concludere che c'è un problema reale (trovato mentre si verificava la #12).
