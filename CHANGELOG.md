# Changelog

Schema descritto in [agent_docs/versioning.md](agent_docs/versioning.md).

## Non rilasciato

### 🚀 Evolutive

- La versione del DS è stampata nella sidebar di Storybook, sotto al nome, in piccolo
  (#37): le app consumer puntano a un tag fisso, e senza il numero qui il confronto con
  quello che hanno in `package.json` non si poteva fare a occhio. Letta da `package.json`,
  non scritta a mano. Storybook 10 ha rimosso dall'enum dei tipi gli slot
  `experimental_SIDEBAR_TOP` / `SIDEBAR_BOTTOM`, quindi niente addon di manager: con
  `brandImage` assente Storybook renderizza `brandTitle` come HTML dentro il link del
  logo, e logo, nome e versione stanno lì. Gli stili sono in `managerHead` — il manager
  non carica il CSS del DS. Contrasto misurato sul rendering vero, non presunto: 5.22:1

## v0.7.0 — 2026-08-11

Giro di consolidamento fatto dopo che entrambe le app sono passate al DS: con ast40 e
gt40 finalmente allineate si vede cosa serve davvero e cosa no.

### ⚠️ Breaking

- **Rimossi 24 componenti** che nessuna delle due app importava (#27): `aspect-ratio`,
  `avatar`, `badge`, `checkbox`, `form`, `input-otp`, `radio-group`, `slider`,
  `toggle-group`, `breadcrumb`, `carousel`, `chart`, `collapsible`, `command`,
  `context-menu`, `data-table`, `menubar`, `navigation-menu`, `pagination`, `resizable`,
  `responsive-dialog`, più lo stack Toast legacy di Radix (`toast`, `toaster`,
  `useToast`, `legacyToast`). Elenco ricalcolato sul codice attuale seguendo gli import
  in modo transitivo, non a occhio: restano `progress`, `separator`, `skeleton` e
  `tooltip`, che sembrano inutilizzati ma sono dipendenze interne di `page-loader` e
  `sidebar`.
- Con loro **21 dipendenze npm in meno** (da 45 a 24): `react-hook-form`, `zod`,
  `chart.js`, `react-chartjs-2`, `cmdk`, `embla-carousel-react`, `input-otp`,
  `react-resizable-panels`, `@hookform/resolvers`, `date-fns` (resta transitiva di
  react-day-picker) e 11 pacchetti `@radix-ui`.
- Rimosse le eccezioni CSS `[data-slot="badge"]` e `[data-slot="avatar"]`, morte insieme
  ai componenti che le usavano.

### 🚀 Evolutive

- **`sideEffects` dichiarato** (#31): senza quel campo Rollup non poteva scartare i
  moduli del barrel non importati, e nei consumer finivano librerie mai usate. Misurato
  su gt40: bundle da **2.293 kB a 1.932 kB** (−360 kB, −115 kB gzip), con `cmdk`,
  `input-otp`, `embla`, `react-resizable`, `chart.js`, `zod` e `react-hook-form` passati
  da presenti a zero occorrenze. Vale `["**/*.css"]` e non `false`: `src/index.css` è un
  side-effect vero e non deve sparire.
- **Label dei form più leggere su desktop** (#29): da `text-base md:text-sm` a
  `text-sm md:text-xs` (16/14 → 14/12). I campi restano a 16/14: la soglia dei 16px
  serve a non far zoomare Safari iOS al focus, ma una label non è focusabile e quel
  vincolo non la riguardava — la #21 le aveva uniformate ai campi per coerenza visiva,
  qui si corregge.
- **Regola tipografica: sentence case, mai maiuscolo integrale** (gt40 #54). Il DS non
  usava `uppercase` da nessuna parte, la regola serve alle app consumer. Documentata in
  `agent_docs/component-conventions.md`.

### 📝 Documentazione

- README: i comandi di installazione puntavano ancora al vecchio nome del repo
  (`tabaccheria-design-system`) — copiati e incollati oggi fallivano.
- `accessibility.md`, `theming.md`, `component-conventions.md`: rimossi i riferimenti ai
  componenti eliminati. La nota su a11y dei grafici è stata riscritta come lezione da
  riusare, non buttata: il problema del `<canvas>` senza nome accessibile non dipendeva
  da quel componente.

## v0.6.1 — 2026-08-08

### 🐛 Bug fixing

- Il mapping colori del `Toaster` aggiunto in v0.6.0 non funzionava: la regola viveva
  dentro `@layer base`, e in CSS un layer perde **sempre** contro una regola non in nessun
  layer, qualunque sia la specificità — l'ordine dei layer viene prima della specificità
  nella cascata. sonner inietta la propria colorazione come `<style>` non layerizzato, quindi
  vinceva comunque nonostante la mia regola avesse specificità più alta (0,3,0 contro 0,2,0).
  Spostata fuori da `@layer base`: verificato dal vivo, `toast.success`/`.error` ora
  risolvono davvero su `--positive`/`--negative`, non sulla palette di sonner

## v0.6.0 — 2026-08-08

### 🚀 Evolutive

- Nuovo token `--warning` (verificato 6.19:1 su `--card` chiaro, 8.76:1 su `--card` scuro),
  non condiviso con `--destructive` — che in `[data-theme="ast40"]` è già spostato
  all'arancione per non confondersi col `--primary` rosso, mentre `--warning` resta
  coerente tra i temi come gli altri stati semantici

### 🐛 Bug fixing

- `Toaster` (sonner): `toast.success`/`.warning`/`.error` mostravano l'icona in
  `currentColor` (quasi nera) invece che verde/ambra/rosso — mancava `richColors`, e senza
  quello sonner non applica affatto la sua colorazione semantica. Aggiunto di default, con
  i colori mappati ai token del DS (`--positive`/`--warning`/`--negative`) invece della
  palette hardcoded di sonner, via una regola in `index.css` — non uno `style` prop su
  `Toaster`: sonner inietta la propria regola a runtime sullo stesso selettore, e uno style
  prop non ha garanzia di vincere quella cascata, una regola con specificità più alta sì.
  Bordo tinto, sfondo neutro (`--card`), stesso stile di `Alert variant="destructive"`.
  Nuova story `Avviso` accanto a `Successo`/`Errore`

## v0.5.0 — 2026-08-08

### 🚀 Evolutive

- `PageLoader`: nuova prop `inverted`, per un genitore con sfondo scuro/fotografico
  (una hero image, non `bg-background`). Misurato su un caso reale (ast40, il flash
  vuoto sulla pagina di login): il testo di default (`text-muted-foreground`) era a
  1.6:1 di contrasto contro la foto, la barra rossa a ~1.8:1 — entrambi ben sotto
  soglia AA (4.5:1 testo, 3:1 componenti non testuali). `inverted` porta testo e
  barra al bianco, il massimo di luminanza possibile
- `Progress`: nuova prop `indicatorClassName`, per ricolorare la parte riempita
  separatamente dal track (`className` governa solo quest'ultimo) — usata da
  `PageLoader` per `inverted`

## v0.4.0 — 2026-08-08

### 🚀 Evolutive

- `PageLoader` (`Patterns/PageLoader`): schermata di caricamento a pagina intera —
  logo (slot, il DS non possiede i loghi delle app), barra di `Progress`
  indeterminata e messaggio, centrati sia in verticale che in orizzontale. Nasce
  dalla issue ast40 #17: la label "Caricamento…" su sfondo bianco che ast40 mostrava
  durante la verifica della sessione
- `Progress`: supporta lo stato indeterminato (`value` assente o `null`, il caso
  ARIA corretto per un'attesa di durata sconosciuta — Radix marca
  `data-state="indeterminate"` e omette `aria-valuenow`). Prima `value || 0`
  trattava l'assenza di value come 0%, cioè un indicatore invisibile invece che in
  corso. Ora riempie in loop (`--animate-progress-fill`, nuovo token in
  `index.css`) invece di stare fermo

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
