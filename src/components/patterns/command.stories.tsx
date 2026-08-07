import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

const meta = {
  title: "Patterns/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Palette di ricerca/comando (cmdk). Il campo di ricerca ha già `role=\"combobox\"` gestito dalla libreria; i risultati vengono annunciati dinamicamente via `aria-live` interno.",
      },
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-md border">
      <CommandInput placeholder="Cerca una categoria…" />
      <CommandList>
        <CommandEmpty>Nessun risultato.</CommandEmpty>
        <CommandGroup heading="Aggio">
          <CommandItem>Tabacchi</CommandItem>
          <CommandItem>Lotto</CommandItem>
          <CommandItem>Sisal</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Spesa">
          <CommandItem>Affitto</CommandItem>
          <CommandItem>Stipendi</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
