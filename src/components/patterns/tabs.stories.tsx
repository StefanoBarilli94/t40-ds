import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Patterns/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="aggio" className="w-80">
      <TabsList>
        <TabsTrigger value="aggio">Aggio</TabsTrigger>
        <TabsTrigger value="spesa">Spesa</TabsTrigger>
      </TabsList>
      <TabsContent value="aggio" className="text-sm">
        Totale aggio: 3.845,85 €
      </TabsContent>
      <TabsContent value="spesa" className="text-sm">
        Totale spese: 9.088,08 €
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navigazione da tastiera integrata: Tab per entrare nel tablist, frecce sinistra/destra per cambiare tab (il fuoco resta sul trigger attivo, roving tabindex gestito da Radix).",
      },
    },
  },
};
