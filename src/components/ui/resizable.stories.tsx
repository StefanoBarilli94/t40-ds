import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable";

const meta = {
  title: "Componenti/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "L'handle è raggiungibile da tastiera (Tab) e si ridimensiona con le frecce quando è a fuoco.",
      },
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Orizzontale: Story = {
  args: {},
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-48 w-96 rounded-md border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Pannello A
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Pannello B
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
