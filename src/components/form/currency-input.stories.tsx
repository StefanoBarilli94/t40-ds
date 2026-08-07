import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { CurrencyInput } from "./currency-input";
import { Label } from "./label";

const meta = {
  title: "Form/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input per importi in euro. Il simbolo \"€\" è un indicatore visivo fisso (`aria-hidden`, non fa parte del valore) — la Label deve comunque includere \"€\" nel testo, non affidarsi al solo simbolo (WCAG 1.4.1, stesso principio dei badge Aggio/Spesa). Formattazione it-IT (virgola decimale) applicata al blur; `onValueChange` espone sempre un `number | null`, mai una stringa da parsare a mano. Per un importo scelto da una lista invece che digitato, non serve un componente dedicato: basta formattare l'option di `Select` con la stessa convenzione (`toLocaleString(\"it-IT\", { style: \"currency\", currency: \"EUR\" })`).",
      },
    },
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState<number | null>(1284.5);
      return (
        <div className="grid w-64 gap-1.5">
          <Label htmlFor="importo-story">Importo (€)</Label>
          <CurrencyInput id="importo-story" value={value} onValueChange={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Vuoto: Story = {
  name: "Vuoto",
  parameters: {
    docs: {
      description: {
        story:
          "`value={null}` è un campo vuoto, non zero — importante per i form dove \"non ancora compilato\" e \"importo di 0 €\" sono stati diversi (validazione, invio).",
      },
    },
  },
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState<number | null>(null);
      return (
        <div className="grid w-64 gap-1.5">
          <Label htmlFor="importo-vuoto-story">Importo (€)</Label>
          <CurrencyInput id="importo-vuoto-story" value={value} onValueChange={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabilitato: Story = {
  render: () => (
    <div className="grid w-64 gap-1.5">
      <Label htmlFor="importo-disabled-story">Importo (€)</Label>
      <CurrencyInput id="importo-disabled-story" value={9088.08} disabled />
    </div>
  ),
};
