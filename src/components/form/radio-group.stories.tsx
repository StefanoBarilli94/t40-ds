import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Scelta a schede (issue #117): una scheda per opzione, con titolo e descrizione. Ogni scheda si raggiunge con **Tab** e si sceglie con **Invio o Spazio** (ft40#191), niente frecce. La scheda scelta ha il bordo `--selected-border` (almeno 3:1 sul fondo), il fondo tinto e il pallino pieno. Dai al gruppo un `aria-label` o `aria-labelledby`.",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Esempio({ invalid = false, disabled = false }: { invalid?: boolean; disabled?: boolean }) {
  const [valore, setValore] = useState("tutto");
  return (
    <RadioGroup
      aria-label="Quando non puoi lavorare"
      value={valore}
      onValueChange={setValore}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className="w-full max-w-sm"
    >
      <RadioGroupItem value="tutto" title="Tutto il giorno" description="Non ci sei né la mattina né il pomeriggio" />
      <RadioGroupItem value="mattina" title="La mattina" description="Fino alle 14" />
      <RadioGroupItem value="pomeriggio" title="Il pomeriggio" description="Dalle 14" />
    </RadioGroup>
  );
}

export const Default: Story = { render: () => <Esempio /> };

export const SulTelefono: Story = {
  name: "Sul telefono (360 px)",
  render: () => (
    <div className="p-4">
      <Esempio />
    </div>
  ),
  ...TELEFONO,
};

export const InErrore: Story = { name: "In errore", render: () => <Esempio invalid /> };

export const Spento: Story = { render: () => <Esempio disabled /> };
