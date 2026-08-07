import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const meta = {
  title: "Patterns/Toast (Radix, legacy gt40)",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pattern Toast basato su Radix, presente in gt40 prima dell'adozione di sonner (vedi `Toaster (sonner)`). Va usato tramite l'hook `useToast` + `<Toaster />`, qui mostrato in stato statico aperto per documentarne lo stile. `ToastClose` ha già `toast-close` + icona con `sr-only`.",
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div className="grid gap-1">
          <ToastTitle>Voce salvata</ToastTitle>
          <ToastDescription>La voce è stata aggiunta al mese corrente.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast open variant="destructive">
        <div className="grid gap-1">
          <ToastTitle>Errore</ToastTitle>
          <ToastDescription>Impossibile salvare la voce.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
