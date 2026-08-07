import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./calendar";

const meta = {
  title: "Componenti/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Basato su react-day-picker: griglia navigabile con le frecce, `aria-label` sui bottoni mese precedente/successivo già inclusi, giorno corrente marcato con `aria-current=\"date\"`.",
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Calendar mode="single" selected={new Date(2026, 7, 7)} className="rounded-md border" />
  ),
};
