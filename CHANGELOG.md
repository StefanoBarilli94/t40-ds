# Changelog

Schema descritto in [agent_docs/versioning.md](agent_docs/versioning.md).

## v0.2.0 — 2026-08-08

### 🚀 Evolutive

- Componenti riorganizzati secondo atomic design (`Atoms`/`Form`/`Patterns`)
- Scala tint/shade del brand (`--primary-50`…`900`) e palette chart estesa a 8 colori,
  per entrambi i temi GT40/AST40
- Nuove pagine di documentazione Atoms/Form/Patterns con griglie di card
- `DataTable`: paginazione, righe zebra, toggle mostra/nascondi colonna
- `Chart` migrato da Recharts a Chart.js — **breaking**: `ChartTooltip`/`ChartLegend`
  hanno un'API diversa (nessun consumer li usava ancora)
- `CurrencyInput`: campo per importi in euro con formattazione it-IT

### ✨ Migliorative

- `Card`: story per varianti icona/footer azioni/KPI/minimale
- Story demo con larghezze responsive (`w-full max-w-*`) invece di larghezze fisse
- Audit props/controls: `argTypes` e story mancanti aggiunte su 8 componenti

### 🐛 Bug fixing

- README/Introduzione: rimossi riferimenti ad app interne e repo privati
- Sidebar Storybook: link e dimensioni del logo corretti
- `Carousel`: controlli prev/next non più sovrapposti alla card attiva
- `Slider` disabilitato senza feedback visivo (classe CSS morta), variante `outline`
  di `SidebarMenuButton` illeggibile
- Bottone `secondary` indistinguibile da `outline`, bordo `outline` invisibile, campi
  form (`Input`/`Select`/`Textarea`) con sfondo trasparente invece che bianco

## v0.1.1 — data non tracciata

- Fix: import relativi invece di alias `@/` nei componenti distribuiti (rompeva
  silenziosamente il pacchetto una volta installato altrove)

## v0.1.0 — data non tracciata

- Rilascio iniziale: design system Tabaccheria 4.0
