import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Dettagli voce
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
        Creata il 07/08/2026, categoria "Tabacchi".
      </CollapsibleContent>
    </Collapsible>
  ),
};
