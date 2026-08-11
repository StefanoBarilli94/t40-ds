# Changelog

Schema descritto in [agent_docs/versioning.md](agent_docs/versioning.md).

## v0.9.0 — 2026-08-12

Tre difetti che avevano in comune il modo in cui erano sfuggiti: erano stati verificati
solo per quello che si guardava, non per quello che serviva. Il contrasto dei grafici era
stato misurato sullo sfondo ma non tra le serie; l'animazione delle modali funzionava
quando il centraggio stava dentro `transform`, e nessuno l'ha rivista al cambio di
Tailwind; l'altezza delle modali non era mai stata provata con contenuto lungo.

### ⚠️ Breaking

- **Palette dei grafici rifatta da zero** (#49). La precedente era verificata solo per
  contrasto sullo sfondo — vero, ma insufficiente: due serie possono essere entrambe
  leggibili sul fondo e indistinguibili tra loro. Non lo erano. `--chart-4` (hue 84) e
  `--chart-5` (hue 70) erano due arancioni a 14 gradi di distanza, **ΔE 5,5 anche a vista
  piena**, e `--chart-3` aveva croma 0,07, quindi si leggeva grigio. Gli otto token
  restano otto e mantengono i nomi — nessun consumer si rompe — ma **cambiano tutti
  colore**: un grafico esistente cambia aspetto. Le nuove passano banda di luminosità,
  soglia di croma, separazione per protanopia/deuteranopia/tritanopia, distinguibilità a
  vista normale e contrasto, in tema chiaro e scuro. **L'ordine è parte della correzione**:
  il criterio guarda le coppie adiacenti, quindi le tinte sono intrecciate calda/fredda, e
  invertendo la 7ª con l'8ª la palette non passa più

### 🐛 Bug fixing

- L'animazione di apertura delle modali non parte più dall'angolo in alto a sinistra
  (#42): ora è solo una dissolvenza. `Dialog` e `AlertDialog` avevano `zoom-in-95` e
  `slide-in-from-*` ereditati da shadcn, che in Tailwind v3 servivano a compensare il
  centraggio — `translate-x-[-50%]` finiva dentro `transform` e i due scarti si
  annullavano. **In Tailwind v4 `translate-x-[-50%]` compila nella proprietà `translate`**,
  che è separata da `transform`: le due si compongono invece di sostituirsi, e la modale
  partiva da circa −100%/−98% per arrivare a −50%/−50%. Verificato sul CSS compilato, dove
  sulla modale aperta coesistevano `translate: -50% -50%` e una `transform` con lo stesso
  scarto. Una dissolvenza non tocca la posizione, quindi non può ripresentarsi al prossimo
  giro di Tailwind
- `DialogContent` e `AlertDialogContent` hanno un tetto d'altezza e scorrono al proprio
  interno (#48). Prima `max-height` era `none` e `overflow-y` `visible`: una modale più
  alta della finestra sforava da entrambi i lati, e quello che usciva non si raggiungeva —
  Radix blocca lo scroll della pagina sotto e la modale non ne aveva uno proprio.
  Verificato con 30 righe: 1454px di contenuto, altezza limitata a 687px, ultima riga
  raggiungibile. `dvh` e non `vh`, perché su mobile la barra degli indirizzi che si ritrae
  cambia `vh`

### 📝 Documentazione

- Chiusa **#43 senza modifiche al codice**: non era un difetto. Sostenevo che
  `transition-colors` bloccasse l'outline di focus su `currentColor`, ma la misura era
  presa in un ambiente dove il pannello del browser è nascosto e **non vengono composti
  fotogrammi** — verificato con tre prove: `requestAnimationFrame` non scatta, un'animazione
  di opacità resta a 0, una transizione da nero a bianco resta nera. Con le transizioni
  congelate ogni proprietà transizionata resta sul valore di partenza, e `outline-color`
  parte da `currentColor`. In un browser vero la transizione si completa. La lezione è
  nella issue: prima di incolpare un'animazione, verificare che in quell'ambiente le
  animazioni girino

## v0.8.1 — 2026-08-11

Giro di accessibilità nato da una segnalazione su gt40: "da tastiera non vedo dove sono".
Tirando il filo sono venuti fuori tre difetti sovrapposti, uno per livello — l'app, il
token, la libreria. Qui ci sono i due che appartengono al design system.

**Le app dovrebbero salire a questo tag**: `--ring` cambia, e con esso il colore del focus
su tutto il tema di default (gt40). Su ast40, che usa `[data-theme="ast40"]`, non cambia
niente — il suo `--ring` passava già.

### 📝 Documentazione

- Pagina `Fondamenta/Typography` rifatta (#39). Il difetto vero non erano i valori: i
  campioni erano avvolti in `<div>`, e il CSS della pagina docs di Storybook colpisce
  **ogni div interno** (`.css-… :where(div:not(.sb-unstyled, …))`) sovrascrivendo
  `font-size` e `font-family`. Risultato misurato: tutti i campioni resi a **16px in Nunito
  Sans** — una scala tipografica che non mostrava né la scala né il font. Con
  `className="sb-unstyled"`, che è l'escape hatch previsto da Storybook, ora si leggono
  24/20/16/14/12px in Montserrat.
- Nel merito, la scala è stata riallineata a quella che ast40 e gt40 usano davvero, contata
  sui loro `<h1>`–`<h6>`: l'`H1` documentato era `text-4xl`, misura che nelle due app
  esiste solo sul numero delle pagine 404; il titolo di pagina vero è
  `text-lg font-bold sm:text-xl lg:text-2xl` — **responsive**, identico nei due
  `AppLayout` — e non era documentato affatto. Aggiunto il livello `text-xs`, il titolo più
  diffuso in gt40 (25 occorrenze) e prima assente.
- Rimosso il livello "eyebrow" con `uppercase tracking-wider`: contraddiceva la regola
  sentence case che il DS stesso ha introdotto in `v0.7.0` (gt40 #54). Documentare un
  pattern vietato è peggio che non documentarlo.

### 🐛 Bug fixing

- `--ring` del tema di default scurito da `oklch(0.78 0.14 185)` a `oklch(0.52 0.14 185)`
  (#41). L'outline di focus che il DS mette in `@layer base` usa questo token, e su
  superficie chiara era a **1,87:1** su `--card` e **1,79:1** su `--background` — sotto la
  soglia 3:1 per gli indicatori non testuali (WCAG 1.4.11 / 2.4.11). Ora 4,79:1, 4,58:1 e
  4,26:1 su `--muted`, verificati sul rendering con un Tab vero da tastiera. È lo stesso
  valore di `--primary-text` / `--primary-600`, non una quarta tinta: è la risposta che il
  sistema dà già quando il teal di brand deve stare su chiaro. **`--primary` non cambia**,
  resta `oklch(0.78 0.14 185)` — come sfondo funziona (10:1 col suo foreground). Misurati
  anche gli altri temi, che restano come sono perché passavano già: ast40 5,43:1, tema
  scuro 3,69:1, `--sidebar-ring` 10,05:1 sulla sidebar. Emerso da
  [gt40#72](https://github.com/StefanoBarilli94/gt40/issues/72)
- Resta aperto #43, trovato durante lo stesso lavoro: sui componenti con
  `transition-colors` — quasi tutta la libreria, `Button` compreso — l'outline di focus
  resta bloccata su `currentColor` e `--ring` non arriva mai. Tailwind v4 include
  `outline-color` in quella lista. Riproduzione e misure nella issue; nessun rimedio
  proposto perché nessuno dei due tentati regge alla verifica

## v0.8.0 — 2026-08-11

Solo Storybook: **niente cambia in `src/`**, quindi ast40 e gt40 non hanno motivo di
spostare il loro tag da `v0.7.0`. Le due cose divergono di proposito, ed è esattamente
l'informazione che questa release rende leggibile.

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
