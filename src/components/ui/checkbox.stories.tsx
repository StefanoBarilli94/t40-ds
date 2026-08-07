import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Componenti/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="fissa-cb-story" />
      <Label htmlFor="fissa-cb-story">Voce fissa</Label>
    </div>
  ),
};

export const Selezionato: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="fissa-on-story" defaultChecked />
      <Label htmlFor="fissa-on-story">Voce fissa</Label>
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="fissa-dis-story" disabled />
      <Label htmlFor="fissa-dis-story">Non disponibile</Label>
    </div>
  ),
};
