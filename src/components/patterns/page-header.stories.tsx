import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { PageHeader } from "./page-header";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: { title: "Turni della settimana" },
  parameters: {
    docs: {
      description: {
        component: "Titolo della pagina, collegamento indietro, contenuto accanto al titolo e azione principale. Passa a back il collegamento dell'app: PageHeader aggiunge la freccia e lo stile. Sul telefono l'azione è sotto il titolo e occupa tutta la larghezza.",
      },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const back = <a href="#settimane">Torna alle settimane</a>;
const aside = <Badge>Bozza</Badge>;
const action = <Button>Pubblica i turni</Button>;

export const SoloTitolo: Story = { name: "Solo titolo" };
export const ConIndietro: Story = { name: "Con indietro", args: { back } };
export const ConTag: Story = { name: "Con tag", args: { aside } };
export const ConAzione: Story = { name: "Con azione", args: { action } };
export const TuttoInsieme: Story = { name: "Tutto insieme", args: { back, aside, action } };
export const SulTelefono: Story = {
  ...TELEFONO,
  name: "Sul telefono (360 px)",
  args: { back, aside, action },
  render: (args) => <div className="p-4"><PageHeader {...args} /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro",
  args: { back, aside, action },
  render: (args) => <div className="dark bg-background p-4 text-foreground"><PageHeader {...args} /></div>,
};
