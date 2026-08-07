import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Componenti/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Il focus viene intrappolato dentro il dialog (focus trap) finché non si chiude, e torna sul trigger alla chiusura. `DialogTitle` è obbligatorio: senza, lo screen reader non ha un nome accessibile per il dialog.",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Modifica voce</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica voce</DialogTitle>
          <DialogDescription>
            Aggiorna categoria e importo, poi salva le modifiche.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annulla</Button>
          </DialogClose>
          <Button>Salva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
