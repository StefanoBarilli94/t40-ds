import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button } from "../atoms/button";
import { ResponsiveConfirm } from "./responsive-confirm";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/ResponsiveConfirm",
  component: ResponsiveConfirm,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Conferma con finestra da 1024 px e pannello dal basso su schermi più stretti. Chi usa il componente decide quando chiudere dopo la conferma." } } },
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
  const [confermato, setConfermato] = useState(false);
  return (
    <>
      <Button onClick={() => { setConfermato(false); setAperto(true); }}>Pubblica i turni</Button>
      {confermato && <p role="status" className="mt-2">Turni pubblicati</p>}
      <ResponsiveConfirm
        aperto={aperto}
        onChiudi={() => setAperto(false)}
        titolo="Pubblicare i turni?"
        descrizione="I turni saranno visibili alle persone che lavorano questa settimana."
        azione="Pubblica i turni"
        onConferma={() => { setConfermato(true); setAperto(false); }}
      />
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
