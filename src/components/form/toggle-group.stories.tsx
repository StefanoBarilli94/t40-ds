import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Form/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`variant`/`size` sono ereditate da `toggleVariants` (vedi Form/Toggle) e propagate a ogni `ToggleGroupItem` tramite context, impostandole sul `ToggleGroup` root.",
      },
    },
  },
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

export const VarianteOutline: Story = {
  name: "Variante outline",
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="mese" aria-label="Vista storico">
      <ToggleGroupItem value="mese" aria-label="Vista mensile">
        Mese
      </ToggleGroupItem>
      <ToggleGroupItem value="anno" aria-label="Vista annuale">
        Anno
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Dimensioni: Story = {
  name: "Dimensioni",
  args: { type: "single" },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <ToggleGroup type="single" size="sm" defaultValue="mese" aria-label="Vista storico (sm)">
        <ToggleGroupItem value="mese">Mese</ToggleGroupItem>
        <ToggleGroupItem value="anno">Anno</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="mese" aria-label="Vista storico (default)">
        <ToggleGroupItem value="mese">Mese</ToggleGroupItem>
        <ToggleGroupItem value="anno">Anno</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="mese" aria-label="Vista storico (lg)">
        <ToggleGroupItem value="mese">Mese</ToggleGroupItem>
        <ToggleGroupItem value="anno">Anno</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Disabilitato: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" defaultValue="mese" aria-label="Vista storico" disabled>
      <ToggleGroupItem value="mese">Mese</ToggleGroupItem>
      <ToggleGroupItem value="anno">Anno</ToggleGroupItem>
    </ToggleGroup>
  ),
};
