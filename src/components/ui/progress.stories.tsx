import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";

const meta = {
  title: "Componenti/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Il primitivo Radix espone già `role=\"progressbar\"` e i valori aria-value* correnti. Va comunque aggiunto un `aria-label` descrittivo (cosa sta procedendo) perché il progressbar da solo non lo dice.",
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Progress value={40} aria-label="Avanzamento importazione dati" className="w-72" />,
};

export const Completo: Story = {
  render: () => <Progress value={100} aria-label="Avanzamento importazione dati" className="w-72" />,
};
