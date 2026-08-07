import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { Toggle } from "./toggle";

const meta = {
  title: "Form/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConTesto: Story = {
  name: "Con testo",
  args: { children: "Solo voci fisse" },
};

export const SoloIcona: Story = {
  name: "Solo icona (con aria-label)",
  args: { "aria-label": "Grassetto", children: <Bold /> },
  parameters: {
    docs: {
      description: {
        story: "Come per Button, un Toggle solo-icona richiede `aria-label`.",
      },
    },
  },
};

export const Premuto: Story = {
  args: { children: "Attivo", defaultPressed: true },
};

export const Variante: Story = {
  name: "Variante outline",
  args: { variant: "outline", children: "Outline" },
};

export const Dimensioni: Story = {
  name: "Dimensioni",
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Sm</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Lg</Toggle>
    </div>
  ),
};

export const Disabilitato: Story = {
  args: { children: "Non disponibile", disabled: true },
};
