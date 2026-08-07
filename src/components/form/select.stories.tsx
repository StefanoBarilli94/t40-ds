import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-64 gap-1.5">
      <Label htmlFor="categoria-select-story">Categoria</Label>
      <Select defaultValue="tabacchi">
        <SelectTrigger id="categoria-select-story">
          <SelectValue placeholder="Seleziona categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tabacchi">Tabacchi</SelectItem>
          <SelectItem value="lotto">Lotto</SelectItem>
          <SelectItem value="sisal">Sisal</SelectItem>
          <SelectItem value="mooney">Mooney</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="grid w-64 gap-1.5">
      <Label htmlFor="categoria-select-dis-story">Categoria</Label>
      <Select disabled>
        <SelectTrigger id="categoria-select-dis-story">
          <SelectValue placeholder="Non disponibile" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tabacchi">Tabacchi</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
