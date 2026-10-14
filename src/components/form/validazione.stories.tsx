import type { Meta, StoryObj } from "@storybook/react-vite";
import { CurrencyInput } from "./currency-input";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

/**
 * Tutti i campi delle form in errore (issue #88). Basta `aria-invalid="true"`
 * sul campo, e `aria-describedby` verso il messaggio: il rosso lo mette il
 * componente, le app non aggiungono classi.
 */
const meta = {
  title: "Form/Validazione",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Errore({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-sm text-destructive">
      {children}
    </p>
  );
}

export const TuttiInErrore: Story = {
  render: () => (
    <form className="grid w-80 gap-5" noValidate>
      <div className="grid gap-1.5">
        <Label htmlFor="v-nome">Nome</Label>
        <Input id="v-nome" aria-invalid="true" aria-describedby="v-nome-e" />
        <Errore id="v-nome-e">Scrivi il nome.</Errore>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="v-data">Primo giorno</Label>
        <Input id="v-data" type="date" aria-invalid="true" aria-describedby="v-data-e" className="h-12" />
        <Errore id="v-data-e">Serve il primo giorno.</Errore>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="v-importo">Importo</Label>
        <CurrencyInput id="v-importo" aria-invalid="true" aria-describedby="v-importo-e" value={-10} />
        <Errore id="v-importo-e">L'importo non può essere negativo.</Errore>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="v-categoria">Categoria</Label>
        <Select>
          <SelectTrigger id="v-categoria" aria-invalid="true" aria-describedby="v-categoria-e">
            <SelectValue placeholder="Scegli una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tabacchi">Tabacchi</SelectItem>
            <SelectItem value="lotto">Lotto</SelectItem>
          </SelectContent>
        </Select>
        <Errore id="v-categoria-e">Scegli una categoria.</Errore>
      </div>
      <div className="grid gap-1.5">
        <Label id="v-fascia-l">Fascia</Label>
        <ToggleGroup
          type="single"
          variant="outline"
          aria-labelledby="v-fascia-l"
          aria-invalid="true"
          aria-describedby="v-fascia-e"
          className="justify-start"
        >
          <ToggleGroupItem value="mattina">Mattina</ToggleGroupItem>
          <ToggleGroupItem value="pomeriggio">Pomeriggio</ToggleGroupItem>
        </ToggleGroup>
        <Errore id="v-fascia-e">Scegli una fascia.</Errore>
      </div>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <Switch id="v-consenso" aria-invalid="true" aria-describedby="v-consenso-e" />
          <Label htmlFor="v-consenso">Ho controllato i dati</Label>
        </div>
        <Errore id="v-consenso-e">Conferma di aver controllato.</Errore>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="v-nota">Nota</Label>
        <Textarea id="v-nota" aria-invalid="true" aria-describedby="v-nota-e" />
        <Errore id="v-nota-e">Scrivi il motivo.</Errore>
      </div>
    </form>
  ),
};
