import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clock } from "lucide-react";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Callout } from "./callout";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/Callout",
  component: Callout,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["neutral", "primary", "success", "warning", "destructive"] },
  },
  args: { tone: "primary", children: "Le modifiche valgono per le settimane create da adesso." },
  parameters: {
    docs: {
      description: {
        component:
          "Avviso dentro la pagina (issue #121): fondo tenue, bordo sottile e l'icona del tono, **senza barra laterale spessa**. Il testo resta nero: il colore sta sull'icona, e la parola dice il resto.\n\n**La regola delle barre laterali**: una barra laterale si usa solo per dire lo stato di una scheda (Card `variant=\"accent\"`, le barre di EventCalendar), mai per decorare, e non è mai più di 2 px (`--accent-bar-width`). Un avviso è un Callout, non una scheda con la barra.",
      },
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Toni: Story = {
  render: () => (
    <div className="grid max-w-xl gap-3">
      <Callout tone="neutral">Il conteggio ufficiale delle ferie resta del consulente.</Callout>
      <Callout tone="primary" title="In breve">
        Paola ha fatto 3 domeniche in più della media negli ultimi 12 mesi.
      </Callout>
      <Callout tone="success">Orari salvati. Valgono per le settimane create da adesso.</Callout>
      <Callout tone="warning" title="Settimana in bozza">
        I dipendenti non la vedono finché non la pubblichi.
      </Callout>
      <Callout tone="destructive" title="Non salvato">
        Due fasce si sovrappongono: correggi gli orari segnati in rosso.
      </Callout>
    </div>
  ),
};

export const ConAzione: Story = {
  name: "Con un'azione",
  render: () => (
    <Callout
      tone="warning"
      title="Ci sono modifiche non avvisate"
      action={
        <Button size="sm" variant="outline">
          Avvisa
        </Button>
      }
      className="max-w-xl"
    >
      Hai cambiato la settimana dopo averla pubblicata: chi lavora non lo sa ancora.
    </Callout>
  ),
};

export const AltraIcona: Story = {
  name: "Un'altra icona o nessuna",
  render: () => (
    <div className="grid max-w-xl gap-3">
      <Callout tone="neutral" icon={<Clock />}>
        Gli orari si cambiano dalle Impostazioni.
      </Callout>
      <Callout tone="neutral" icon={null}>
        Senza icona, solo testo.
      </Callout>
    </div>
  ),
};

export const DentroUnaCard: Story = {
  name: "Dentro una card",
  render: () => (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Dal lunedì al sabato</CardTitle>
      </CardHeader>
      <CardContent>
        <Callout tone="warning">Questa fascia finisce dopo la chiusura del negozio.</Callout>
      </CardContent>
    </Card>
  ),
};

export const SulTelefono: Story = {
  name: "Sul telefono (360 px)",
  render: () => (
    <div className="grid gap-3 p-4">
      <Callout tone="primary" title="In breve">
        Jolly ha fatto 5 turni in meno della media negli ultimi 12 mesi.
      </Callout>
      <Callout tone="warning" action={<Button className="w-full">Avvisa</Button>}>
        Ci sono modifiche non ancora avvisate.
      </Callout>
    </div>
  ),
  ...TELEFONO,
};

export const TemaScuro: Story = {
  name: "Tema scuro",
  render: () => (
    <div className="dark grid max-w-xl gap-3 bg-background p-4 text-foreground">
      <Callout tone="primary">Evidenza</Callout>
      <Callout tone="success">Positivo</Callout>
      <Callout tone="warning">Attenzione</Callout>
      <Callout tone="destructive">Errore</Callout>
    </div>
  ),
};
