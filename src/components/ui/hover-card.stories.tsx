import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";

const meta = {
  title: "Componenti/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Si apre anche al focus da tastiera (non solo al passaggio del mouse), quindi resta utilizzabile senza puntatore. Su touch non c'è hover: non mettere qui informazioni indispensabili al completamento di un task.",
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@monica</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm font-medium">Monica</p>
        <p className="text-sm text-muted-foreground">Operatrice cassa dal 2024.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
