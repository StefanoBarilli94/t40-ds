import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

const meta = {
  title: "Componenti/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const voci = Array.from({ length: 20 }, (_, i) => `Voce ${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      {voci.map((voce, i) => (
        <div key={voce}>
          <p className="text-sm">{voce}</p>
          {i < voci.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </ScrollArea>
  ),
};
