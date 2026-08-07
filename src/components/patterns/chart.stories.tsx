import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  ChartAccessibleTable,
  ChartContainer,
  ChartLegend,
  useChartColors,
  useChartScales,
  useChartTooltip,
  withAlpha,
  type ChartConfig,
} from "./chart";

// Niente `component: ChartContainer` in meta: `config` è una prop richiesta
// (ChartConfig specifico per ogni story) — costringerebbe ogni story a
// fabbricare args finti (stesso caso di Form/DataTable, vedi form.stories.tsx).
const meta = {
  title: "Patterns/Chart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper di theming per Chart.js (`react-chartjs-2`), migrato da Recharts (issue #9). Un `<canvas>` Chart.js non espone NULLA a uno screen reader — ancora meno accessibile dell'SVG di Recharts. **Il grafico da solo non basta mai**: affiancare sempre `ChartAccessibleTable` (vedi story \"Con tabella dati\") e marcare il grafico `aria-hidden=\"true\"`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const dati = [
  { mese: "Mag", aggio: 17718 },
  { mese: "Giu", aggio: 20240 },
  { mese: "Lug", aggio: 16704 },
  { mese: "Ago", aggio: 3846 },
];

// var(--primary), non var(--color-primary): l'alias --color-* di Tailwind
// (@theme inline) è dichiarato una sola volta su :root e non segue un
// [data-theme="ast40"] annidato — stesso bug di fondo trovato e fixato in
// Fondamenta/Colori (issue #4). Il token raw cascata correttamente.
const config = {
  aggio: { label: "Aggio", color: "var(--primary)" },
} satisfies ChartConfig;

function AggioBar() {
  const colors = useChartColors();
  const tooltip = useChartTooltip();
  const scales = useChartScales();

  return (
    <Bar
      aria-label="Grafico a barre: aggio mensile, ultimi 4 mesi"
      data={{
        labels: dati.map((d) => d.mese),
        datasets: [
          {
            label: "Aggio",
            data: dati.map((d) => d.aggio),
            backgroundColor: colors.aggio,
            borderRadius: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip },
        scales,
      }}
    />
  );
}

export const Barre: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-96">
      <AggioBar />
    </ChartContainer>
  ),
};

function AggioLine() {
  const colors = useChartColors();
  const tooltip = useChartTooltip();
  const scales = useChartScales();

  return (
    <Line
      aria-label="Grafico a linee: aggio mensile, ultimi 4 mesi"
      data={{
        labels: dati.map((d) => d.mese),
        datasets: [
          {
            label: "Aggio",
            data: dati.map((d) => d.aggio),
            borderColor: colors.aggio,
            backgroundColor: colors.aggio,
            pointRadius: 3,
            tension: 0.3,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip },
        scales,
      }}
    />
  );
}

export const Linee: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-96">
      <AggioLine />
    </ChartContainer>
  ),
};

function AggioArea() {
  const colors = useChartColors();
  const tooltip = useChartTooltip();
  const scales = useChartScales();

  return (
    <Line
      aria-label="Grafico ad area: aggio mensile, ultimi 4 mesi"
      data={{
        labels: dati.map((d) => d.mese),
        datasets: [
          {
            label: "Aggio",
            data: dati.map((d) => d.aggio),
            borderColor: colors.aggio,
            backgroundColor: withAlpha(colors.aggio, 0.25),
            fill: true,
            pointRadius: 3,
            tension: 0.3,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip },
        scales,
      }}
    />
  );
}

export const Area: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-96">
      <AggioArea />
    </ChartContainer>
  ),
};

const categorie = [
  { categoria: "Tabacchi", importo: 1405 },
  { categoria: "Lotto", importo: 728 },
  { categoria: "Gratta e vinci", importo: 313 },
  { categoria: "Altro", importo: 240 },
];

const categorieConfig = {
  tabacchi: { label: "Tabacchi", color: "var(--chart-1)" },
  lotto: { label: "Lotto", color: "var(--chart-2)" },
  grattaEVinci: { label: "Gratta e vinci", color: "var(--chart-3)" },
  altro: { label: "Altro", color: "var(--chart-4)" },
} satisfies ChartConfig;

function AggioDoughnut() {
  const colors = useChartColors();
  const tooltip = useChartTooltip();

  return (
    <Doughnut
      aria-label="Grafico a torta: ripartizione incasso per categoria"
      data={{
        labels: categorie.map((c) => c.categoria),
        datasets: [
          {
            data: categorie.map((c) => c.importo),
            backgroundColor: Object.values(colors),
            borderWidth: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip },
      }}
    />
  );
}

export const TortaDoughnut: Story = {
  name: "Torta / Doughnut",
  render: () => (
    <div className="w-64">
      <ChartContainer config={categorieConfig} className="aspect-square h-64 w-64">
        <AggioDoughnut />
        <ChartLegend />
      </ChartContainer>
    </div>
  ),
};

export const ConTabellaDati: Story = {
  name: "Con tabella dati (alternativa accessibile)",
  parameters: {
    docs: {
      description: {
        story:
          "`ChartAccessibleTable` è la versione riutilizzabile del pattern \"tabella sr-only accanto al grafico\": stessi dati, marcati semanticamente (`<caption>`, `scope=\"col\"/\"row\"`), invisibili solo visivamente. Il grafico ha `aria-hidden=\"true\"` — per chi usa uno screen reader esiste solo la tabella.",
      },
    },
  },
  render: () => (
    <div className="w-96 space-y-3">
      <ChartContainer config={config} className="h-64 w-96" aria-hidden="true">
        <AggioBar />
      </ChartContainer>
      <ChartAccessibleTable
        caption="Aggio mensile, ultimi 4 mesi"
        columns={[
          { key: "mese", header: "Mese", cell: (r: (typeof dati)[number]) => r.mese, isRowHeader: true },
          { key: "aggio", header: "Aggio", cell: (r: (typeof dati)[number]) => `${r.aggio} €` },
        ]}
        data={dati}
      />
    </div>
  ),
};
