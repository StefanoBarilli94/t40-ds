import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Check, Minus, TriangleAlert } from "lucide-react";
import { WeekStrip } from "./week-strip";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/WeekStrip",
  component: WeekStrip,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Sette pulsanti raggiungibili con Tab. Il giorno selezionato ha aria-current e ogni stato ha un'icona e un nome accessibile. L'app sceglie dove posizionare la striscia." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const NOMI = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

function Esempio() {
  const [scelto, setScelto] = useState("10");
  return (
    <WeekStrip
      className="w-full max-w-md"
      selected={scelto}
      onSelectDay={setScelto}
      days={NOMI.map((nome, indice) => ({
        id: String(indice + 9), label: `${nome} ${indice + 9} novembre`, shortLabel: nome.slice(0, 3),
        day: indice + 9, today: indice === 2,
        status: indice === 6
          ? { label: "chiuso", icon: <Minus className="text-muted-foreground" /> }
          : indice === 3
            ? { label: "da sistemare", icon: <TriangleAlert className="text-warning" /> }
            : { label: "coperto", icon: <Check className="text-positive" /> },
      }))}
    />
  );
}
export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro", render: () => <div className="dark bg-background p-4 text-foreground"><Esempio /></div>,
};
