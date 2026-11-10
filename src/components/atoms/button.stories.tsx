import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Loader2, Trash2 } from "lucide-react";
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
      options: ["default", "destructive", "destructive-outline", "outline", "secondary", "ghost", "link"],
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
      <Button {...args} variant="destructive-outline">
        Destructive outline
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

export const TutteSpente: Story = {
  name: "Tutte le varianti spente",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button disabled>Salva</Button>
      <Button disabled variant="destructive">Elimina</Button>
      <Button disabled variant="destructive-outline">Togli</Button>
      <Button disabled variant="outline">Annulla le modifiche</Button>
      <Button disabled variant="secondary">Secondario</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="link">Collegamento</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Spento vuol dire fondo `--muted` e testo `--muted-foreground` (5.3:1), non più l'opacità al 50% (issue #123): un pulsante sbiadito sembrava rotto.",
      },
    },
  },
};

export const SpentoConMotivo: Story = {
  name: "Spento, con il motivo",
  render: () => (
    <div className="grid max-w-xs gap-2">
      <Button disabled aria-describedby="motivo-salva">
        Salva
      </Button>
      <p id="motivo-salva" className="text-sm text-muted-foreground">
        Nessuna modifica da salvare.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**La regola**: un pulsante spento ha sempre il motivo scritto accanto, collegato con `aria-describedby`. Se il motivo non sta in poche parole, il pulsante resta attivo e il messaggio arriva al tocco (\"Scrivi la password\").",
      },
    },
  },
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

export const TogliRiga: Story = {
  name: "Togli una riga (destructive-outline)",
  render: () => (
    <Button size="icon" variant="destructive-outline" className="size-11" aria-label="Togli la fascia Mattina">
      <Trash2 />
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Il cestino accanto a una riga di un elenco da modificare: rosso perché toglie, ma vuoto perché non è l'azione principale (quella resta il pulsante pieno, per esempio \"Salva\"). Solo icona, quindi `aria-label` con il nome di ciò che toglie.",
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

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

/**
 * Sul telefono (sotto `md`) ogni taglia è alta 44 px, il minimo per il dito
 * (issue #116). Da `md` in su tornano 36 px (default), 32 (sm), 40 (lg).
 * Non servono più classi `h-11` nelle app.
 */
export const SulTelefono: Story = {
  name: "Sul telefono (360 px)",
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-4">
      <Button>Salva</Button>
      <Button size="sm" variant="outline">Piccolo</Button>
      <Button size="lg" variant="secondary">Grande</Button>
      <Button size="icon" variant="outline" aria-label="Elimina la riga"><Trash2 /></Button>
    </div>
  ),
  ...TELEFONO,
};
