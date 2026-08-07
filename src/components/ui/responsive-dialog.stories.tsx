import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ResponsiveDialog,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "./responsive-dialog";
import { Button } from "./button";

const meta = {
  title: "Componenti/ResponsiveDialog",
  component: ResponsiveDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente custom di gt40: diventa un Drawer da basso su mobile e un Dialog centrato su desktop, riusando gli stessi primitivi accessibili di entrambi (focus trap, titolo obbligatorio, Esc per chiudere). Ridimensiona il viewport di Storybook per vedere il cambio di layout.",
      },
    },
  },
} satisfies Meta<typeof ResponsiveDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Apri giornata</Button>
      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Chiudi giornata</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Conferma la chiusura cassa del 7 agosto 2026.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <Button onClick={() => setOpen(false)}>Conferma</Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialog>
    </>
  );
}

export const Default: Story = {
  args: { open: false, onOpenChange: () => {}, children: null },
  render: () => <Demo />,
};
