import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { Toaster } from "./sonner";
import { Button } from "./button";

const meta = {
  title: "Componenti/Toaster (sonner)",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Notifiche non bloccanti. Sonner annuncia i toast tramite una regione `aria-live` dedicata: appaiono anche per chi usa uno screen reader, senza rubare il focus.",
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("Voce salvata correttamente.")}>Mostra toast</Button>
    </div>
  ),
};

export const Successo: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast.success("Importazione completata.")}>Mostra successo</Button>
    </div>
  ),
};

export const Errore: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="destructive"
        onClick={() => toast.error("Impossibile salvare: importo non valido.")}
      >
        Mostra errore
      </Button>
    </div>
  ),
};
