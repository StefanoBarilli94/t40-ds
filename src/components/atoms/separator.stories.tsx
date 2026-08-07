import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Per default `decorative` è `true`: il separatore è nascosto agli screen reader (`role` rimosso) perché puramente visivo. Impostare `decorative={false}` solo se separa davvero sezioni di contenuto semanticamente distinte.",
      },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Orizzontale: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Sopra</p>
      <Separator className="my-3" />
      <p className="text-sm">Sotto</p>
    </div>
  ),
};

export const Verticale: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Aggio</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Spesa</span>
    </div>
  ),
};
