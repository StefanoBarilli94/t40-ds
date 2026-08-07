# Convenzioni Storybook

## Formato story

CSF3 (`export const X: Story = { ... }`), sempre con tag `["autodocs"]` sul `meta` — la
pagina di documentazione si genera da lì, non va scritta a mano separatamente.

Quando `render:` sostituisce completamente l'output di default e il componente ha props
richieste "innaturali" da riempire solo per soddisfare TypeScript (es. `Form`,
`InputOTP`), ometti `component:` dal `meta` invece di fabbricare `args` finti — vedi
`form.stories.tsx` per l'esempio.

## Tassonomia (`title` nel meta)

In transizione verso atomic design: `Atom/*`, `Form/*`, `Pattern/*` (vedi issue #1 su
GitHub). Finché la riorganizzazione non è completa, i `title` esistenti usano ancora
`Componenti/*` — non mescolare le due convenzioni nello stesso PR, converti un file alla
volta o tutti insieme, non a metà.

`Fondamenta/*` è riservato alle pagine `.mdx` non legate a un componente specifico
(Colori, Typography, Introduzione) — non componenti UI.

## Note nelle story

Ogni scelta di accessibilità/design non ovvia va documentata in
`parameters.docs.description` (component o story), non solo nel commento del codice —
è quello che finisce nella pagina autodocs che chi consuma il componente legge
davvero.

## Tema

Le story ereditano il tema da `.storybook/preview.tsx` (toolbar in alto). Se stai
verificando un fix di contrasto o di colore, controllalo in **entrambi** i temi
(GT40 e AST40) prima di considerarlo chiuso — un fix per un tema può rompere l'altro
(vedi il clash destructive/primary in AST40, issue #4).
