import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Form/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Singolo: Story = {
  name: "Selezione singola",
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" defaultValue="mese" aria-label="Vista storico">
      <ToggleGroupItem value="mese" aria-label="Vista mensile">
        Mese
      </ToggleGroupItem>
      <ToggleGroupItem value="anno" aria-label="Vista annuale">
        Anno
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiplo: Story = {
  name: "Selezione multipla",
  args: { type: "multiple" },
  render: () => (
    <ToggleGroup type="multiple" aria-label="Filtra categorie">
      <ToggleGroupItem value="aggio" aria-label="Filtra aggio">
        Aggio
      </ToggleGroupItem>
      <ToggleGroupItem value="spesa" aria-label="Filtra spesa">
        Spesa
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
