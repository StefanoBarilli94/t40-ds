import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays } from "lucide-react";
import { Badge } from "../atoms/badge";
import { IconTile } from "../atoms/icon-tile";
import { ListCard } from "./list-card";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/ListCard",
  component: ListCard,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "L'intera scheda è un collegamento. Usa asChild con un collegamento del router. Lo stato può stare prima o dopo il titolo." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Esempio() {
  return (
    <ul className="w-full max-w-md space-y-2" role="list">
      <li>
        <ListCard href="#ferie" title="Ferie" status={<Badge tone="warning">In attesa</Badge>}
          icon={<IconTile className="bg-warning-subtle"><CalendarDays /></IconTile>}
          detail="Dal 12 al 15 novembre" secondaryDetail="4 giorni"
        />
      </li>
      <li>
        <ListCard asChild title="Richiesta speciale" status={<Badge tone="success">Soddisfatta</Badge>}
          statusPosition="after" detail="Venerdì 20 novembre"
        >
          <a href="#richiesta" />
        </ListCard>
      </li>
    </ul>
  );
}
export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro", render: () => <div className="dark bg-background p-4 text-foreground"><Esempio /></div>,
};
