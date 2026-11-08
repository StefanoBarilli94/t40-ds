import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Label } from "./label";
import { TimeInput } from "./time-input";

const meta = {
  title: "Form/TimeInput",
  component: TimeInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Orario a 24 ore, uguale su telefono e computer. Si scrive come viene (\"7.30\", \"7:30\", \"730\", \"7\") e uscendo dal campo diventa \"07:30\"; oppure si sceglie dall'elenco che apre l'orologio, a passi di 15 minuti. Nell'elenco ogni orario si raggiunge con Tab e si sceglie con Invio o Spazio. Un testo che non è un orario resta com'è e il campo diventa rosso. `onValueChange` dà sempre \"HH:MM\" o `null` (vuoto o non valido), nello stesso formato di `input type=\"time\"`. Sostituisce `Input type=\"time\"`, che su Chrome per computer si cambia una cifra alla volta.",
      },
    },
  },
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ iniziale = "07:30", ...props }: { iniziale?: string } & React.ComponentProps<typeof TimeInput>) {
  const [valore, setValore] = React.useState<string | null>(iniziale);
  return (
    <div className="grid w-40 gap-1.5">
      <Label htmlFor="orario-story">Dalle</Label>
      <TimeInput id="orario-story" className="h-11" value={valore ?? ""} onValueChange={setValore} {...props} />
      <p className="text-xs text-muted-foreground">Valore: {valore ?? "nessuno"}</p>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };

export const Vuoto: Story = {
  parameters: { docs: { description: { story: "Campo vuoto: l'elenco si apre vicino alle 8, il caso più comune." } } },
  render: () => <Demo iniziale="" />,
};

export const IntervalloRistretto: Story = {
  name: "Intervallo ristretto",
  parameters: {
    docs: { description: { story: "Con `da`, `a` e `passo` l'elenco mostra solo gli orari che hanno senso: qui dalle 6 alle 22, ogni mezz'ora." } },
  },
  render: () => <Demo da="06:00" a="22:00" passo={30} />,
};

export const NonValido: Story = {
  name: "Non valido",
  parameters: { docs: { description: { story: "Un testo che non è un orario resta scritto e il campo è rosso, da correggere." } } },
  render: () => <Demo iniziale="25.10" />,
};

export const Disabilitato: Story = { render: () => <Demo disabled /> };

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

/**
 * Tre campi in una griglia di 3 colonne a 360 px, come una fascia degli Orari
 * di ft40 (issue #119): l'orario si legge intero, "07:30", con l'orologio.
 */
export const InGrigliaSulTelefono: Story = {
  name: "In griglia sul telefono (360 px)",
  render: () => {
    const [dalle, setDalle] = React.useState("07:30");
    const [alle, setAlle] = React.useState("13:00");
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        <div className="grid gap-1.5">
          <Label htmlFor="dalle">Dalle</Label>
          <TimeInput id="dalle" value={dalle} onValueChange={(v) => setDalle(v ?? "")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="alle">Alle</Label>
          <TimeInput id="alle" value={alle} onValueChange={(v) => setAlle(v ?? "")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="persone">Persone</Label>
          <input id="persone" defaultValue="2" className="h-11 border border-input bg-card px-3 md:h-9" />
        </div>
      </div>
    );
  },
  ...TELEFONO,
};
