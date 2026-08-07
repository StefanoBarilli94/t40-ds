import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Input } from "./input";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Componenti/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Categoria" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AbbinataAInput: Story = {
  name: "Abbinata a un Input",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="voce-story">Voce</Label>
      <Input id="voce-story" placeholder="Es. Lotto" />
    </div>
  ),
};

export const AbbinataAControllo: Story = {
  name: "Abbinata a un controllo (peer)",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="fissa-story" />
      <Label htmlFor="fissa-story">Voce fissa</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cliccare sulla label attiva il controllo collegato: fondamentale per chi usa lo screen reader o ha difficoltà di precisione con il mouse (target touch più ampio).",
      },
    },
  },
};
