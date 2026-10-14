import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Campo di testo base. Va **sempre** abbinato a una `Label` collegata via `htmlFor`/`id`: un placeholder da solo non è un'etichetta accessibile.",
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="importo">Importo</Label>
      <Input id="importo" placeholder="0,00" />
    </div>
  ),
};

export const Tipi: Story = {
  render: () => (
    <div className="grid w-72 gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email-story">Email</Label>
        <Input id="email-story" type="email" placeholder="nome@esempio.it" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password-story">Password</Label>
        <Input id="password-story" type="password" placeholder="••••••••" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="data-story">Data</Label>
        <Input id="data-story" type="date" />
      </div>
    </div>
  ),
};

/**
 * Il campo data a tutta larghezza, come nei moduli su telefono: l'icona del
 * calendario sta in fondo a destra, non attaccata alla data (issue #85).
 */
export const DataATuttaLarghezza: Story = {
  name: "Data a tutta larghezza",
  render: () => (
    <div className="grid w-[420px] max-w-full gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="dal-story">Primo giorno</Label>
        <Input id="dal-story" type="date" defaultValue="2026-10-16" className="h-12" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="al-story">Ultimo giorno</Label>
        <Input id="al-story" type="date" className="h-12" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ora-story">Ora</Label>
        <Input id="ora-story" type="time" defaultValue="07:30" className="h-12" />
      </div>
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="disabled-story">Campo bloccato</Label>
      <Input id="disabled-story" disabled placeholder="Non modificabile" />
    </div>
  ),
};

export const ConErrore: Story = {
  name: "Con errore di validazione",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="errore-story">Importo</Label>
      {/* Basta aria-invalid: il bordo rosso lo mette il componente (issue #88). */}
      <Input id="errore-story" aria-invalid="true" aria-describedby="errore-story-msg" defaultValue="-10" />
      <p id="errore-story-msg" className="text-sm text-destructive">
        L'importo non può essere negativo.
      </p>
      <Label htmlFor="errore-data-story">Ultimo giorno</Label>
      <Input id="errore-data-story" type="date" aria-invalid="true" aria-describedby="errore-data-msg" className="h-12" />
      <p id="errore-data-msg" className="text-sm text-destructive">
        Serve l'ultimo giorno.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`aria-invalid` + `aria-describedby` collegano il messaggio d'errore al campo per gli screen reader, non solo visivamente in rosso.",
      },
    },
  },
};
