import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta = {
  title: "Componenti/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Pannello mobile-first che sale dal basso (basato su vaul), usato tipicamente al posto di Dialog su schermi stretti.",
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Apri azioni</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Azioni rapide</DrawerTitle>
          <DrawerDescription>Scegli cosa fare con questa giornata.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Esporta PDF</Button>
          <DrawerClose asChild>
            <Button variant="outline">Chiudi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
