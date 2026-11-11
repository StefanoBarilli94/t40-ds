import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button } from "../atoms/button";
import { ResponsivePanel } from "./responsive-panel";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/ResponsivePanel",
  component: ResponsivePanel,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Pannello per una scelta breve. Si apre al centro da 1024 px e dal basso su schermi più stretti. L'app fornisce i comandi nel contenuto." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Esempio({ scuro = false }: { scuro?: boolean }) {
  useEffect(() => {
    if (!scuro) return;
    const radice = document.documentElement;
    const giaScuro = radice.classList.contains("dark");
    radice.classList.add("dark");
    return () => {
      if (!giaScuro) radice.classList.remove("dark");
    };
  }, [scuro]);

  const [aperto, setAperto] = useState(false);
  return (
    <>
      <Button onClick={() => setAperto(true)}>Scegli il periodo</Button>
      <ResponsivePanel aperto={aperto} onChiudi={() => setAperto(false)} titolo="Scegli il periodo">
        <div className="grid gap-2">
          <Button onClick={() => setAperto(false)}>Questa settimana</Button>
          <Button variant="outline" onClick={() => setAperto(false)}>Indietro</Button>
        </div>
      </ResponsivePanel>
    </>
  );
}
export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro",
  parameters: { docs: { story: { inline: false } } },
  render: () => <Esempio scuro />,
};
