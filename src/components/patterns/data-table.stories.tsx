import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataTableColumn } from "./data-table";

// Niente `component: DataTable` in meta: DataTable è generico su T e ha
// `columns`/`data` come prop richieste — non ha senso pilotarle via Controls,
// e costringerebbe ogni story a fabbricare args finti (stesso caso di Form,
// vedi form.stories.tsx).
const meta = {
  title: "Patterns/DataTable",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Estensione di `Table` con paginazione, righe zebra e toggle mostra/nascondi colonna — pensata per tabelle lunghe (storico movimenti). Genera le colonne da una config (`key`/`header`/`cell`), non richiede una libreria di gestione tabelle esterna.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Movimento = {
  id: string;
  voce: string;
  tipo: "Aggio" | "Spesa";
  data: string;
  importo: string;
};

const movimenti: Movimento[] = [
  { id: "1", voce: "Tabacchi", tipo: "Aggio", data: "01/08/2026", importo: "1.405,41 €" },
  { id: "2", voce: "Lotto", tipo: "Aggio", data: "01/08/2026", importo: "727,64 €" },
  { id: "3", voce: "Gratta e vinci", tipo: "Aggio", data: "02/08/2026", importo: "312,90 €" },
  { id: "4", voce: "Ricariche telefoniche", tipo: "Aggio", data: "03/08/2026", importo: "98,20 €" },
  { id: "5", voce: "Affitto", tipo: "Spesa", data: "05/08/2026", importo: "1.850,00 €" },
  { id: "6", voce: "Utenze", tipo: "Spesa", data: "05/08/2026", importo: "410,55 €" },
  { id: "7", voce: "Bollette telefoniche", tipo: "Aggio", data: "06/08/2026", importo: "44,10 €" },
  { id: "8", voce: "Valori bollati", tipo: "Aggio", data: "07/08/2026", importo: "156,80 €" },
  { id: "9", voce: "Materiale di consumo", tipo: "Spesa", data: "08/08/2026", importo: "89,30 €" },
  { id: "10", voce: "Superenalotto", tipo: "Aggio", data: "09/08/2026", importo: "205,60 €" },
  { id: "11", voce: "Manutenzione registratore", tipo: "Spesa", data: "10/08/2026", importo: "120,00 €" },
  { id: "12", voce: "Sigarette elettroniche", tipo: "Aggio", data: "11/08/2026", importo: "540,15 €" },
];

const columns: DataTableColumn<Movimento>[] = [
  { key: "voce", header: "Voce", cell: (r) => r.voce },
  { key: "tipo", header: "Tipo", cell: (r) => r.tipo },
  { key: "data", header: "Data", cell: (r) => r.data },
  {
    key: "importo",
    header: "Importo",
    className: "text-right",
    cell: (r) => r.importo,
  },
];

export const Default: Story = {
  name: "Paginazione",
  parameters: {
    docs: {
      description: {
        story:
          "Con più righe di `pageSize` compaiono i controlli prev/next e l'indicatore \"Pagina X di Y\" (annunciato via `aria-live` ai cambi pagina).",
      },
    },
  },
  render: () => <DataTable columns={columns} data={movimenti} pageSize={5} getRowId={(r) => r.id} />,
};

export const ColonneNascoste: Story = {
  name: "Toggle colonne",
  parameters: {
    docs: {
      description: {
        story:
          "`initialHiddenColumns` nasconde una colonna all'apertura (qui \"Data\") — resta comunque riattivabile dal menu \"Colonne\", che usa `DropdownMenuCheckboxItem` e non chiude il menu a ogni click, per attivarne/disattivarne più di una in un colpo solo.",
      },
    },
  },
  render: () => (
    <DataTable
      columns={columns}
      data={movimenti}
      pageSize={5}
      getRowId={(r) => r.id}
      initialHiddenColumns={["data"]}
    />
  ),
};
