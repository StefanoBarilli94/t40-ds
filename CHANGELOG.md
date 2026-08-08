# Changelog

Schema descritto in [agent_docs/versioning.md](agent_docs/versioning.md).

## v0.3.1 — 2026-08-08

Due difetti nel fix del focus di v0.3.0, trovati installando davvero il tag in ast40
(non con una copia manuale in `node_modules`, che aveva nascosto entrambi dietro la
cache dei moduli di Vite).

### 🐛 Bug fixing

- Il colore del focus ricadeva su `currentColor` invece che sul token di brand: la
  scorciatoia `outline: 2px solid var(--color-ring)` risolve il colore rispetto al
  contesto in cui è scritta la dichiarazione, non a quello dell'elemento a fuoco. Ora
  sono proprietà longhand (`outline-color` separata) sul token `--ring` corretto
- (#24) La classe `[&::-webkit-calendar-picker-indicator]:ml-auto` non viene generata
  da Tailwind — pseudo-elementi `::-webkit-*` non sono un target supportato dai
  varianti arbitrari. Sostituita con una regola CSS diretta in `index.css`

## v0.3.0 — 2026-08-08

Tutti i difetti qui sotto sono emersi migrando ast40 al design system (ast40 #7–#14):
si vedono usando i componenti in un'app vera, non nelle story.

### 🚀 Evolutive

- `DialogContent`: nuova prop `dismissOnOutsideClick` (#25). **Cambio di
  comportamento**: il click fuori dalla modale ora **non** la chiude più per default,
  perché su una modale con un form significava perdere quanto digitato per un click di
  troppo. Chi mostra contenuto di sola lettura passa `dismissOnOutsideClick`. Esc resta
  sempre attivo.

### 🐛 Bug fixing

- **Focus invisibile su tutta la libreria** (#23): i componenti rimuovevano l'outline
  nativa e la sostituivano con `ring-*`, che Tailwind rende come `box-shadow` — cioè
  proprio quello che il reset azzera con `box-shadow: none !important`. Risultato:
  navigando da tastiera non si vedeva dove si era, su 17 componenti. Il focus ora è un
  `outline` dichiarato una volta sola in `index.css`, che nessuna regola sulle ombre può
  spegnere, e vale anche per gli elementi nativi delle app consumer (WCAG 2.4.7 AA)
- `Alert`: icona 5px sotto il centro del testo quando c'è solo `AlertDescription`, cioè
  nel caso tipico di un errore di form — il posizionamento assoluto con `top-4` era
  tarato sul caso "titolo + descrizione". Ora è una griglia a due colonne (#20)
- Campi form di dimensioni diverse tra loro e dalle etichette sotto i 768px (#21):
  `Input`/`Textarea`/`CurrencyInput` erano a 16px, `Select`/`InputOTP`/`Label` a 14px.
  Ora tutti seguono la stessa coppia `text-base md:text-sm`, quindi etichetta e campo
  hanno sempre la stessa dimensione
- `Sidebar` su mobile: bordo destro chiaro sul pannello scuro, perché ereditava
  `--border` invece di `--sidebar-border` (#22)
- `Input type="date"`: icona del calendario appiccicata al testo invece che sul bordo
  destro — `display: flex` sull'input rompe il layout interno di Chrome (#24)
- Ring decorativi morti per la stessa ragione del focus: separatore degli avatar
  sovrapposti e slot attivo di `InputOTP`, entrambi passati a `outline`

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
