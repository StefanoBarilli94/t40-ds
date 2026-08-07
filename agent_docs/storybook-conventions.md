# Convenzioni Storybook

## Formato story

CSF3 (`export const X: Story = { ... }`), sempre con tag `["autodocs"]` sul `meta` — la
pagina di documentazione si genera da lì, non va scritta a mano separatamente.

Quando `render:` sostituisce completamente l'output di default e il componente ha props
richieste "innaturali" da riempire solo per soddisfare TypeScript (es. `Form`,
`InputOTP`), ometti `component:` dal `meta` invece di fabbricare `args` finti — vedi
`form.stories.tsx` per l'esempio.

## Tassonomia (`title` nel meta)

Atomic design: `Atoms/*`, `Form/*`, `Patterns/*` (issue #1, GitHub — completata). I
componenti vivono in `src/components/{atoms,form,patterns}/` e il `title` della story
riflette la cartella. Un nuovo componente va nella cartella/categoria giusta fin
dall'inizio — non serve più la vecchia convenzione `Componenti/*`.

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
