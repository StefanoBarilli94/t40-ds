import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "Componenti/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pannello laterale (usa lo stesso primitivo di Dialog: focus trap, `SheetTitle` obbligatorio, Esc per chiudere).",
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DaDestra: Story = {
  name: "Da destra (default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri filtri</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtri</SheetTitle>
          <SheetDescription>Restringi i risultati per categoria e periodo.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Applica</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
