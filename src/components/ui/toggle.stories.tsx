import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { Toggle } from "./toggle";

const meta = {
  title: "Componenti/Toggle",
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
