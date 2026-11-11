import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays } from "lucide-react";
import { IconTile } from "./icon-tile";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Atoms/IconTile",
  component: IconTile,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Riquadro decorativo. Il testo accanto dice cosa rappresenta l'icona. Per un fondo di stato usa i token del tema." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Esempio() {
  return <div className="flex items-center gap-3"><IconTile className="bg-primary-subtle"><CalendarDays /></IconTile><span>Ferie</span></div>;
}
export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro", render: () => <div className="dark bg-background p-4 text-foreground"><Esempio /></div>,
};
