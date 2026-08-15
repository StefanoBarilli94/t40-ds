import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Etichetta di stato: una parola o due dentro un chip. Il tono tinge **sfondo e bordo**, mai il testo, che resta su `--foreground`: un chip piccolo con testo colorato su sfondo tinto è proprio il caso in cui il contrasto scende sotto 4.5:1 senza che si veda a occhio. Il colore quindi rinforza e non porta l'informazione — la parola dentro il chip resta leggibile in scala di grigi e in stampa (WCAG 1.4.1). Stesso vocabolario di toni di `Card`/`CardStat`.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toni: Story = {
  args: { children: "Etichetta" },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Neutro</Badge>
      <Badge tone="primary">In corso</Badge>
      <Badge tone="success">Confermato</Badge>
      <Badge tone="warning">Da controllare</Badge>
      <Badge tone="destructive">Scaduto</Badge>
    </div>
  ),
};

export const Dimensioni: Story = {
  args: { children: "Etichetta" },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" tone="warning">Piccolo</Badge>
      <Badge size="md" tone="warning">Normale</Badge>
    </div>
  ),
};

export const DentroUnaGriglia: Story = {
  args: { children: "Etichetta" },
  parameters: {
    docs: {
      description: {
        story:
          "Il caso che ha fatto nascere il componente (gt40#129): dentro una griglia di importi, uno stato scritto come testo attenuato si perde. Il chip lo stacca senza gridare.",
      },
    },
  },
  render: () => (
    <div className="grid w-[420px] grid-cols-3 divide-x divide-border border border-border">
      {[
        { label: "Lotto", valore: "€ 1.608,00", stato: null },
        { label: "Sisal", valore: null, stato: "Da inserire" },
        { label: "Mooney", valore: null, stato: "Da inserire" },
      ].map(c => (
        <div key={c.label} className="space-y-1 p-4">
          <p className="text-xs text-muted-foreground">{c.label}</p>
          {c.valore ? (
            <p className="text-xl font-semibold tabular-nums">{c.valore}</p>
          ) : (
            <Badge tone="warning">{c.stato}</Badge>
          )}
        </div>
      ))}
    </div>
  ),
};
