import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Form/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Segmented control: voci fisse tra cui sceglierne una (`type=\"single\"`) o più (`type=\"multiple\"`). Ruoli ARIA e navigazione da tastiera (frecce, Home/End) inclusi da Radix. Dai al gruppo un `aria-label` quando non c'è un titolo visibile.",
      },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SceltaSingola: Story = {
  name: "Scelta singola",
  args: { variant: "outline" },
  render: (args) => (
    <ToggleGroup {...args} type="single" defaultValue="settimana" aria-label="Periodo">
      <ToggleGroupItem value="giorno">Giorno</ToggleGroupItem>
      <ToggleGroupItem value="settimana">Settimana</ToggleGroupItem>
      <ToggleGroupItem value="mese">Mese</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SceltaMultipla: Story = {
  name: "Scelta multipla",
  args: { variant: "outline" },
  render: (args) => (
    <ToggleGroup {...args} type="multiple" defaultValue={["bio"]} aria-label="Filtri">
      <ToggleGroupItem value="bio">Bio</ToggleGroupItem>
      <ToggleGroupItem value="offerte">In offerta</ToggleGroupItem>
      <ToggleGroupItem value="novita">Novità</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ConIcone: Story = {
  name: "Solo icone (con aria-label)",
  render: () => (
    <ToggleGroup type="single" defaultValue="sinistra" variant="outline" aria-label="Allineamento">
      <ToggleGroupItem value="sinistra" aria-label="Allinea a sinistra">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="centro" aria-label="Allinea al centro">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="destra" aria-label="Allinea a destra">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Come per Button/Toggle, un item solo-icona richiede `aria-label`.",
      },
    },
  },
};

export const Dimensioni: Story = {
  name: "Dimensioni",
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup
          key={size}
          type="single"
          defaultValue="b"
          size={size}
          variant="outline"
          aria-label={`Dimensione ${size}`}
        >
          <ToggleGroupItem value="a">Uno</ToggleGroupItem>
          <ToggleGroupItem value="b">Due</ToggleGroupItem>
          <ToggleGroupItem value="c">Tre</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const Disabilitato: Story = {
  name: "Disabilitato",
  render: () => (
    <ToggleGroup type="single" defaultValue="a" disabled aria-label="Non disponibile">
      <ToggleGroupItem value="a">Uno</ToggleGroupItem>
      <ToggleGroupItem value="b">Due</ToggleGroupItem>
      <ToggleGroupItem value="c">Tre</ToggleGroupItem>
    </ToggleGroup>
  ),
};
