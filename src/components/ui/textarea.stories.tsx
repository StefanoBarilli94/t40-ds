import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";
import { Label } from "./label";

const meta = {
  title: "Componenti/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="note-story">Note</Label>
      <Textarea id="note-story" placeholder="Aggiungi una nota…" />
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="note-disabled-story">Note</Label>
      <Textarea id="note-disabled-story" disabled defaultValue="Testo non modificabile" />
    </div>
  ),
};
