import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Azione primaria dell'interfaccia. Usa `asChild` per comporre con un link (`<a>`) mantenendo lo stile del bottone.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
  },
  args: { children: "Salva", onClick: () => {} },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Invia email">
        <Mail />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  name: "Stato di caricamento",
  render: (args) => (
    <Button {...args} disabled aria-busy="true">
      <Loader2 className="animate-spin" />
      Salvataggio…
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Durante un'operazione asincrona il bottone va disabilitato e marcato con `aria-busy` per non far ripartire l'azione due volte.",
      },
    },
  },
};

export const StatiHover: Story = {
  name: "Stati hover",
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Passa il mouse sopra i bottoni. `default`/`destructive`/`secondary` restano piene (solo leggermente più scure all'hover). `outline`/`ghost` prendono uno sfondo **neutro** (`bg-muted`) invece del colore primario/accent — prima usavano `bg-accent`, identico a `--primary`, e all'hover diventavano indistinguibili da un bottone `default`.",
      },
    },
  },
};

export const IconOnlyAccessibile: Story = {
  name: "Icon-only (con aria-label)",
  render: () => (
    <Button size="icon" variant="outline" aria-label="Invia email">
      <Mail />
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Un bottone che mostra solo un'icona **deve** avere un `aria-label` testuale: senza etichetta visibile, uno screen reader non ha altro modo di descriverne l'azione.",
      },
    },
  },
};
