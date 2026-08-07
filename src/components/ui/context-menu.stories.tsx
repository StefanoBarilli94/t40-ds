import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu";

const meta = {
  title: "Componenti/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Si apre col tasto destro del mouse, ma resta raggiungibile da tastiera con il tasto Menu/Shift+F10 sull'elemento con focus: non è un pattern accessibile solo al mouse.",
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Tasto destro su una riga della tabella
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Modifica</ContextMenuItem>
        <ContextMenuItem>Duplica</ContextMenuItem>
        <ContextMenuItem className="text-destructive">Elimina</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
