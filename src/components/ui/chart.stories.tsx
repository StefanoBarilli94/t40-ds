import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./chart";

const meta = {
  title: "Componenti/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper di theming per Recharts (SVG). Un grafico SVG non è nativamente accessibile: **il componente da solo non basta**. Affiancare sempre i dati anche in forma testuale/tabellare (vedi story \"Con tabella dati\") per chi usa uno screen reader o non percepisce bene il colore.",
      },
    },
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const dati = [
  { mese: "Mag", aggio: 17718 },
  { mese: "Giu", aggio: 20240 },
  { mese: "Lug", aggio: 16704 },
  { mese: "Ago", aggio: 3846 },
];

const config = {
  aggio: { label: "Aggio", color: "var(--color-primary)" },
} satisfies ChartConfig;

export const Default: Story = {
  args: { config, children: <div /> },
  render: () => (
    <ChartContainer config={config} className="h-64 w-96">
      <BarChart data={dati}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mese" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="aggio" fill="var(--color-aggio)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

export const ConTabellaDati: Story = {
  name: "Con tabella dati (alternativa accessibile)",
  args: { config, children: <div /> },
  render: () => (
    <div className="w-96 space-y-3">
      <ChartContainer config={config} className="h-64 w-96" aria-hidden="true">
        <BarChart data={dati}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mese" tickLine={false} axisLine={false} />
          <Bar dataKey="aggio" fill="var(--color-aggio)" radius={4} />
        </BarChart>
      </ChartContainer>
      <table className="sr-only">
        <caption>Aggio mensile, ultimi 4 mesi</caption>
        <thead>
          <tr>
            <th scope="col">Mese</th>
            <th scope="col">Aggio</th>
          </tr>
        </thead>
        <tbody>
          {dati.map((d) => (
            <tr key={d.mese}>
              <th scope="row">{d.mese}</th>
              <td>{d.aggio} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
