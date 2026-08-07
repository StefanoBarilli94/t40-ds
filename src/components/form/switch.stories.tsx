import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";
import { Label } from "./label";

const meta = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifiche-story" />
      <Label htmlFor="notifiche-story">Notifiche attive</Label>
    </div>
  ),
};

export const Attivo: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifiche-on-story" defaultChecked />
      <Label htmlFor="notifiche-on-story">Notifiche attive</Label>
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifiche-off-story" disabled />
      <Label htmlFor="notifiche-off-story">Non disponibile</Label>
    </div>
  ),
};
