import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Patterns/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Singolo: Story = {
  name: "Apertura singola",
  args: { type: "single" },
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="aggio">
        <AccordionTrigger>Voci Aggio</AccordionTrigger>
        <AccordionContent>Slot, Lotto, Sisal, Mooney, Tabacchi…</AccordionContent>
      </AccordionItem>
      <AccordionItem value="spesa">
        <AccordionTrigger>Voci Spesa</AccordionTrigger>
        <AccordionContent>Affitto, Stipendi, Utenze…</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
