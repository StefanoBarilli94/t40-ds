import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat, StatItem } from "./stat";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/Stat",
  component: Stat,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Da due a quattro colonne con etichetta e valore. I numeri hanno cifre della stessa larghezza." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Esempio() {
  return (
    <section className="w-full max-w-md space-y-2 border border-border bg-card p-4">
      <h2 className="font-semibold">Ferie 2026</h2>
      <Stat columns={3}>
        <StatItem label="Effettuate" value={5} />
        <StatItem label="Richieste" value={2} />
        <StatItem label="Rimanenti" value={8} />
      </Stat>
    </section>
  );
}

export const QuattroColonne: Story = {
  name: "Quattro colonne",
  render: () => (
    <Stat columns={4} className="w-full max-w-md">
      <StatItem label="Incassi" value="125 €" />
      <StatItem label="Entrate" value="50 €" />
      <StatItem label="Uscite" value="25 €" />
      <StatItem label="Totale" value="150 €" />
    </Stat>
  ),
};

export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro", render: () => <div className="dark bg-background p-4 text-foreground"><Esempio /></div>,
};
