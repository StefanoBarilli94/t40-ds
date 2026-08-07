import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Button } from "./button";

const meta = {
  title: "Componenti/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Va sempre avvolto in un `TooltipProvider` (una sola volta, in alto nell'app). Il tooltip compare sia al hover che al focus da tastiera: mai usarlo come unico veicolo di un'informazione essenziale, dato che su touch non c'è hover.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Informazioni sul riporto">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Il riporto è il saldo del mese precedente.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
