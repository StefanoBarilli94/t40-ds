import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster } from "./toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Toaster (Radix, legacy gt40)",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Contenitore che ascolta lo stato dell'hook `useToast` e monta i `Toast` attivi. Va reso una sola volta, in cima all'app; poi si invoca `toast({ title, description })` da qualunque componente.",
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
      <Button onClick={() => toast({ title: "Voce salvata", description: "Aggiunta al mese corrente." })}>
        Mostra toast
      </Button>
    </div>
  ),
};
