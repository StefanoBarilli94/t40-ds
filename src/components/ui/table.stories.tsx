import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "Componenti/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Usa markup HTML semantico (`<table>`, `<th scope>` implicito via `TableHead`): questo permette a uno screen reader di annunciare intestazioni di riga/colonna mentre l'utente naviga le celle.",
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const righe = [
  { voce: "Tabacchi", tipo: "Aggio", importo: "1.405,41 €" },
  { voce: "Lotto", tipo: "Aggio", importo: "727,64 €" },
  { voce: "Affitto", tipo: "Spesa", importo: "1.850,00 €" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Movimenti di agosto 2026</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Voce</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Importo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {righe.map((r) => (
          <TableRow key={r.voce}>
            <TableCell>{r.voce}</TableCell>
            <TableCell>{r.tipo}</TableCell>
            <TableCell className="text-right">{r.importo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
