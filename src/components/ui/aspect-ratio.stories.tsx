import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./aspect-ratio";

const meta = {
  title: "Componenti/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sedici9: Story = {
  name: "16:9",
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Quadrato: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
};
