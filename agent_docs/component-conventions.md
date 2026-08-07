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

- Un file per componente in `src/components/ui/`, `React.forwardRef` + `cva` per le
  varianti (vedi `button.tsx` come riferimento canonico).
- Story a fianco, stesso nome, `*.stories.tsx`, tag `autodocs`.
- Ogni componente Radix-based eredita ruoli ARIA/focus dal primitivo — non
  reimplementarli a mano.

## Eccezioni al reset globale (`src/index.css`, `@layer base`)

La regola globale è "niente `border-radius`, niente `box-shadow`, ovunque". Le uniche
eccezioni sono marcate con `data-slot` + regola CSS dedicata:

- `[data-slot="badge"]` — badge/tag restano arrotondati.
- `[data-slot="avatar"]` — avatar resta circolare.

Se un nuovo componente ha davvero bisogno di angoli arrotondati (es. un futuro
componente "pill"), segui lo stesso pattern: `data-slot="<nome>"` sul componente +
eccezione in `index.css`, non un override locale nel componente stesso — altrimenti la
regola smette di essere una fonte di verità unica.
