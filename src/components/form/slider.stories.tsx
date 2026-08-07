import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";
import { Label } from "./label";

const meta = {
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Controllabile da tastiera (frecce, Home/End, Page Up/Down). Va etichettato: `aria-label` diretto oppure `aria-labelledby` verso una `Label` visibile.",
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label id="soglia-story-label">Soglia avviso spesa</Label>
      <Slider
        aria-labelledby="soglia-story-label"
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label id="range-story-label">Intervallo importo</Label>
      <Slider aria-labelledby="range-story-label" defaultValue={[20, 80]} max={100} step={1} />
    </div>
  ),
};
