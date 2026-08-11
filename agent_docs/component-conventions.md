# Convenzioni componenti

## Import interni: relativi, mai `@/`

I componenti sono partiti come copia da ast40 (shadcn con alias `@/components/ui/...`,
`@/lib/utils`). **Questo pacchetto non usa quell'alias**: ogni import cross-file dentro
`src/` è relativo (`../../lib/utils`, `./button`, ecc.).

Motivo: quando il pacchetto viene installato come dipendenza altrove, l'alias `@/*` del
consumer punta al SUO `src/`, non a quello di questo pacchetto — un `@/hooks/use-toast`
qui dentro risolverebbe (o fallirebbe silenziosamente) contro l'app che lo consuma, non
contro questo repo. Bug reale trovato e fixato in v0.1.1 (`git log v0.1.0..v0.1.1`).

Se copi un componente nuovo da shadcn/ast40/gt40: converti subito gli import in relativi
prima di committare. Verifica con `bunx tsc --noEmit` — se un consumer smette di risolvere
un componente, è quasi sempre questo.

## Pattern di un componente

- Un file per componente in `src/components/{atoms,form,patterns}/` (vedi
  `agent_docs/storybook-conventions.md` per la tassonomia), `React.forwardRef` + `cva`
  per le varianti (vedi `button.tsx` come riferimento canonico).
- Story a fianco, stesso nome, `*.stories.tsx`, tag `autodocs`.
- Ogni componente Radix-based eredita ruoli ARIA/focus dal primitivo — non
  reimplementarli a mano.

## Eccezioni al reset globale (`src/index.css`, `@layer base`)

La regola globale è "niente `border-radius`, niente `box-shadow`, ovunque", e al momento
non ha eccezioni: quelle che c'erano (`[data-slot="badge"]`, `[data-slot="avatar"]`) sono
state rimosse con la #27 insieme ai componenti che le usavano.

Se un nuovo componente ha davvero bisogno di angoli arrotondati (es. un futuro
componente "pill"), segui il pattern che usavano: `data-slot="<nome>"` sul componente +
eccezione in `index.css`, **non** un override locale nel componente stesso — altrimenti
la regola smette di essere una fonte di verità unica.

Nota per chi lavora sulle app consumer: il reset usa `!important`, quindi un'eccezione
lato app deve stare **nello stesso `@layer base`** e vincere per specificità. Una regola
in `@layer utilities` senza `!important` perde sempre, a prescindere dall'ordine dei
layer (gt40 #41 ci è passata: `.card-shadow` spariva in silenzio).

## Preferire stato React a nuove dipendenze pesanti

Ogni nuova dipendenza pesa su tutti i consumer: il pacchetto e' distribuito come
sorgente, senza step di build. Prima di aggiungerne una, verifica se `useState` e un
po' di codice bastano.

Vale anche al contrario: **non aggiungere componenti "per completezza"**. La #27 ne ha
rimossi 24 che nessuna delle due app importava, e con loro 21 dipendenze npm — fra cui
`react-hook-form`, `zod`, `chart.js` e `cmdk`, tirate dentro da componenti che nessuno
usava. Un componente entra nel DS quando una delle app ne ha bisogno davvero.

## Tipografia: sentence case, mai maiuscolo

Etichette, titoli, bottoni e voci di menu vanno in **sentence case** ("Fondo cassa",
non "FONDO CASSA" ne "Fondo Cassa").

Il maiuscolo integrale rallenta la lettura: elimina il profilo variabile delle parole,
su cui si appoggia il riconoscimento rapido, e costringe a leggere lettera per lettera.
Su un gestionale che si usa tutti i giorni, dove l'utente scorre le stesse schermate
centinaia di volte, e' il tipo di attrito che si paga a ogni interazione. Vale anche il
title case, meno grave ma comunque piu' lento del sentence case.

Vale per il DS e per le app consumer (gt40 #54). Se serve dare peso a un'etichetta,
usare colore o `font-medium`, non `uppercase` + `tracking-wider`.

## Form: la label e' secondaria rispetto al valore

I campi stanno a `text-base md:text-sm` (16px mobile / 14px desktop): i **16px su
mobile non sono estetica**, sotto quella soglia Safari iOS zooma la pagina quando
l'utente mette a fuoco il campo. Non scendere.

Le **label** invece stanno a `text-sm md:text-xs` (14/12): non sono focusabili, quindi
lo zoom di iOS non le riguarda, e un gradino sotto il valore rende leggibile a colpo
d'occhio qual e' il dato e qual e' l'etichetta (issue #29). La #21 le aveva uniformate
ai campi, ma quel vincolo tecnico non le riguardava.

## Story: larghezze responsive nelle demo

Se una story usa una larghezza fissa solo per il demo (`w-80`, `w-96`...), preferisci
`w-full max-w-80` invece di `w-80` da solo — altrimenti ispezionarla con l'addon
Viewport di Storybook su un breakpoint mobile è inutile (la card non si restringe mai,
vedi issue #12).
