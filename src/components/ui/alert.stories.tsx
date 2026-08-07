import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Componenti/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ha già `role=\"alert\"`, quindi uno screen reader lo annuncia automaticamente appena entra nel DOM — non serve altro markup ARIA.",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Nota</AlertTitle>
      <AlertDescription>
        Puoi esportare il CSV del mese corrente dalla pagina Storico.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Errore</AlertTitle>
      <AlertDescription>L'importo inserito non è valido.</AlertDescription>
    </Alert>
  ),
};
