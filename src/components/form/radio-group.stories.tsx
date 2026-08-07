import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="aggio" aria-label="Tipo movimento">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="aggio" id="tipo-aggio-story" />
        <Label htmlFor="tipo-aggio-story">Aggio</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="spesa" id="tipo-spesa-story" />
        <Label htmlFor="tipo-spesa-story">Spesa</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Il gruppo va etichettato con `aria-label` (o `aria-labelledby`) sul `RadioGroup`, non solo con le label dei singoli item.",
      },
    },
  },
};

export const Disabilitato: Story = {
  render: () => (
    <RadioGroup defaultValue="aggio" aria-label="Tipo movimento" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="aggio" id="tipo-aggio-disabled-story" />
        <Label htmlFor="tipo-aggio-disabled-story">Aggio</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="spesa" id="tipo-spesa-disabled-story" />
        <Label htmlFor="tipo-spesa-disabled-story">Spesa</Label>
      </div>
    </RadioGroup>
  ),
};
