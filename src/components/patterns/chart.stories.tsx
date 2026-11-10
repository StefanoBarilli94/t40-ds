import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartLegend, ChartTooltipContent } from "./chart";
import { chartAxisProps, chartColors, chartGridProps } from "./chart-presets";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/Chart",
  component: ChartLegend,
  tags: ["autodocs"],
  args: { series: [] },
  parameters: {
    docs: {
      description: {
        component:
          "Legenda e tooltip HTML per Recharts, con preset per assi e griglia. Metti sempre la legenda sotto il grafico. Evita etichette sulle linee con più di quattro serie o meno di tre punti. Con un solo mese usa le barre. Assegna i colori di chartColors in ordine, fino a otto serie, e affianca al grafico una tabella con i dati.",
      },
    },
  },
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

const NOMI = ["Andrea", "Monica", "Ilaria", "Elena", "Laura", "Paolo"];
const MESI = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

function Esempio({ mesi = 12, persone = 3 }: { mesi?: number; persone?: number }) {
  const series = NOMI.slice(0, persone).map((name, index) => ({ name, color: chartColors[index] }));
  const data: Record<string, string | number>[] = MESI.slice(0, mesi).map((mese, index) => ({
    mese,
    ...Object.fromEntries(series.map(({ name }, persona) => [name, 4 + ((index * (persona + 2) + persona * 3) % 12)])),
  }));
  const Grafico = mesi === 1 ? BarChart : LineChart;
  return (
    <figure className="w-full max-w-3xl space-y-3 p-4">
      <figcaption className="font-semibold">Turni per mese</figcaption>
      <div className="h-64 min-w-0" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <Grafico data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid {...chartGridProps} />
            <XAxis {...chartAxisProps} dataKey="mese" />
            <YAxis {...chartAxisProps} width={32} allowDecimals={false} />
            <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: "var(--muted-foreground)", fill: "var(--muted)" }} />
            {series.map(({ name, color }) =>
              mesi === 1 ? (
                <Bar key={name} dataKey={name} fill={color} maxBarSize={40} isAnimationActive={false} />
              ) : (
                <Line key={name} dataKey={name} stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
              ),
            )}
          </Grafico>
        </ResponsiveContainer>
      </div>
      <ChartLegend series={series} />
      <details className="text-sm">
        <summary className="min-h-11 cursor-pointer py-3 md:min-h-9 md:py-2">Vedi i numeri</summary>
        <div className="overflow-x-auto" role="region" aria-label="Tabella dei turni per mese" tabIndex={0}>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th scope="col" className="p-2">Mese</th>
                {series.map(({ name }) => <th key={name} scope="col" className="p-2">{name}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((riga) => (
                <tr key={riga.mese} className="border-t border-border">
                  <th scope="row" className="p-2 font-medium">{riga.mese}</th>
                  {series.map(({ name }) => <td key={name} className="p-2 tabular-nums">{riga[name]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

export const DodiciMesi: Story = { name: "Dodici mesi", render: () => <Esempio /> };
export const UnMese: Story = { name: "Un mese", render: () => <Esempio mesi={1} /> };
export const SeiSerie: Story = { name: "Sei serie", render: () => <Esempio persone={6} /> };
export const SulTelefono: Story = { ...TELEFONO, name: "Sul telefono (360 px)", render: () => <Esempio mesi={1} persone={6} /> };
export const TemaScuro: Story = {
  name: "Tema scuro",
  render: () => <div className="dark bg-background text-foreground"><Esempio persone={6} /></div>,
};
