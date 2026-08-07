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
      <Input
        id="errore-story"
        aria-invalid="true"
        aria-describedby="errore-story-msg"
        className="border-destructive focus-visible:ring-destructive"
        defaultValue="-10"
      />
      <p id="errore-story-msg" className="text-sm text-destructive">
        L'importo non può essere negativo.
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
