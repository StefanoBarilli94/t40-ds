import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Apri filtri</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm font-medium">Filtra per categoria</p>
        <p className="text-sm text-muted-foreground">
          Esc chiude il popover e riporta il focus sul trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
