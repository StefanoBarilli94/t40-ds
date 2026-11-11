import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "../form/input";
import { Label } from "../form/label";
import { StepperForm } from "./stepper-form";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/StepperForm",
  component: StepperForm,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Un passo per schermata, con avanzamento e comandi fissi in basso. Il motivo per cui un pulsante è spento compare sopra i comandi." } } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Esempio() {
  const [passo, setPasso] = useState(0);
  const [nota, setNota] = useState("");
  const [inviato, setInviato] = useState(false);
  if (inviato) return <p role="status">Richiesta inviata</p>;
  return (
    <StepperForm
      step={passo}
      onStepChange={setPasso}
      cancel={<a href="#inizio">Annulla</a>}
      submitLabel="Invia richiesta"
      submitDisabled={false}
      onSubmit={(e) => { e.preventDefault(); setInviato(true); }}
      steps={[
        {
          ready: !!nota.trim(),
          reason: "Scrivi perché non puoi lavorare per andare avanti.",
          content: <div className="space-y-2"><Label htmlFor="motivo">Perché non puoi lavorare?</Label><Input id="motivo" value={nota} onChange={(e) => setNota(e.target.value)} /></div>,
        },
        { ready: true, reason: null, content: <p>Motivo della richiesta: {nota}</p> },
      ]}
    />
  );
}
export const EsempioBase: Story = { name: "Uso normale", render: () => <Esempio /> };
export const SulTelefono: Story = {
  ...TELEFONO, name: "Sul telefono (360 px)", render: () => <div className="p-4"><Esempio /></div>,
};
export const TemaScuro: Story = {
  name: "Tema scuro", render: () => <div className="dark bg-background p-4 text-foreground"><Esempio /></div>,
};
