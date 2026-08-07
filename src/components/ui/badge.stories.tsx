import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Componenti/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
  args: { children: "Aggio" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Badge {...args} variant="default">
        Aggio
      </Badge>
      <Badge {...args} variant="destructive">
        Spesa
      </Badge>
      <Badge {...args} variant="secondary">
        In sospeso
      </Badge>
      <Badge {...args} variant="outline">
        Bozza
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Nell'app le badge \"Aggio\"/\"Spesa\" si distinguono per colore: il testo resta comunque presente, quindi l'informazione non dipende solo dal colore (WCAG 1.4.1).",
      },
    },
  },
};
