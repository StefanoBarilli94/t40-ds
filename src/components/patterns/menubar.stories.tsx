import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar";

const meta = {
  title: "Patterns/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Barra di menu in stile desktop, navigabile interamente da tastiera (frecce per muoversi tra i menu e le voci, come i menu nativi del sistema operativo).",
      },
    },
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Esporta CSV <MenubarShortcut>⌘E</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Stampa</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Modifica</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Annulla</MenubarItem>
          <MenubarItem>Ripeti</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
