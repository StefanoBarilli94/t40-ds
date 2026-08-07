import * as React from "react";
import {
  Chart as ChartJSInstance,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Legend as ChartJSLegendPlugin,
  Tooltip as ChartJSTooltipPlugin,
  type TooltipOptions,
} from "chart.js";

import { cn } from "../../lib/utils";

// Registrati una volta sola: coprono bar/line/area/pie/doughnut, i tipi
// richiesti dalle story (issue #9). Radar/polarArea richiederebbero anche
// RadialLinearScale, non ancora usato in nessuna story.
ChartJSInstance.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  ChartJSLegendPlugin,
  ChartJSTooltipPlugin,
);

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig; chartId: string };

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { config: ChartConfig }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config, chartId }}>
      <div
        data-chart={chartId}
        data-slot="chart"
        ref={ref}
        // relative: react-chartjs-2 con maintainAspectRatio:false fa
        // riempire il canvas all'ancestor posizionato più vicino.
        className={cn("relative aspect-video text-xs [&_canvas]:outline-none", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, itemConfig]) => itemConfig.theme || itemConfig.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

/**
 * Chart.js disegna su <canvas>: a differenza di Recharts (SVG, stilizzabile
 * via CSS a runtime dal browser stesso), un fillStyle canvas non capisce
 * `var(...)` — i colori vanno risolti a stringhe concrete in JS. Legge le
 * `--color-<key>` impostate da ChartStyle sul `[data-chart]` più vicino, e le
 * ricalcola se il tema cambia (`data-theme`/`.dark` sull'elemento root, vedi
 * agent_docs/theming.md) grazie a un MutationObserver su <html>.
 */
function useChartColors(): Record<string, string> {
  const { config, chartId } = useChart();
  const keys = React.useMemo(() => Object.keys(config), [config]);
  const [colors, setColors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-chart="${chartId}"]`);
    if (!el) {
      return;
    }

    const resolve = () => {
      const style = getComputedStyle(el);
      const next: Record<string, string> = {};
      for (const key of keys) {
        const value = style.getPropertyValue(`--color-${key}`).trim();
        if (value) {
          next[key] = value;
        }
      }
      setColors(next);
    };

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, [chartId, keys]);

  return colors;
}

/** Stessa logica di useChartColors, per i token strutturali (non di serie). */
function useChartTheme() {
  const { chartId } = useChart();
  const [theme, setTheme] = React.useState({ border: "", mutedForeground: "", card: "", cardForeground: "" });

  React.useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-chart="${chartId}"]`);
    if (!el) {
      return;
    }

    const resolve = () => {
      const style = getComputedStyle(el);
      setTheme({
        border: style.getPropertyValue("--border").trim(),
        mutedForeground: style.getPropertyValue("--muted-foreground").trim(),
        card: style.getPropertyValue("--card").trim(),
        cardForeground: style.getPropertyValue("--card-foreground").trim(),
      });
    };

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, [chartId]);

  return theme;
}

/**
 * Equivalente di `ChartTooltip` (Recharts): Chart.js non accetta un
 * componente React come tooltip via children, il tooltip nativo si
 * configura in `options.plugins.tooltip`. Questo hook restituisce
 * quell'oggetto già tematizzato con i token del design system — va
 * spalmato in `options` del componente `react-chartjs-2` (`<Bar>`/`<Line>`/…).
 */
function useChartTooltip(): Partial<TooltipOptions> {
  const theme = useChartTheme();

  return React.useMemo(
    () => ({
      enabled: true,
      backgroundColor: theme.card || undefined,
      titleColor: theme.cardForeground || undefined,
      bodyColor: theme.cardForeground || undefined,
      borderColor: theme.border || undefined,
      borderWidth: 1,
      padding: 10,
      cornerRadius: 0,
      boxPadding: 4,
      usePointStyle: true,
    }),
    [theme],
  );
}

/**
 * Griglia/assi tematizzati con i token del design system. Ritorno non
 * tipizzato contro `ScaleOptionsByType` di Chart.js: quel tipo non è
 * ricorsivamente `Partial` sui campi annidati (es. `border`), mentre
 * `options.scales` del componente react-chartjs-2 accetta una versione
 * deep-partial — l'oggetto qui sotto va comunque bene a runtime.
 */
function useChartScales() {
  const theme = useChartTheme();

  return React.useMemo(
    () => ({
      x: {
        grid: { display: false },
        ticks: { color: theme.mutedForeground || undefined },
        border: { color: theme.border || undefined },
      },
      y: {
        grid: { color: theme.border || undefined },
        ticks: { color: theme.mutedForeground || undefined },
        border: { display: false },
      },
    }),
    [theme],
  );
}

/**
 * Equivalente di `ChartLegend` (Recharts): elenca le serie da `ChartConfig`
 * direttamente, non da un "payload" — Chart.js non inietta quale dato è
 * effettivamente disegnato, la legenda qui riflette semplicemente la config.
 */
const ChartLegend = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { hideIcon?: boolean }>(
  ({ className, hideIcon = false, ...props }, ref) => {
    const { config } = useChart();
    const colors = useChartColors();

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center justify-center gap-4 pt-3", className)}
        {...props}
      >
        {Object.entries(config).map(([key, itemConfig]) => (
          <div
            key={key}
            className="flex items-center gap-1.5 text-muted-foreground [&>svg]:h-3 [&>svg]:w-3"
          >
            {itemConfig.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: colors[key] }} />
            )}
            {itemConfig.label}
          </div>
        ))}
      </div>
    );
  },
);
ChartLegend.displayName = "ChartLegend";

export type ChartAccessibleTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  isRowHeader?: boolean;
};

/**
 * Un <canvas> Chart.js non espone NULLA a uno screen reader — ancora meno
 * accessibile dell'SVG di Recharts, che almeno aveva nodi DOM ispezionabili.
 * Questo componente è la versione "ufficiale" del pattern tabella dati
 * sr-only già in uso prima della migrazione (issue #9): va sempre affiancato
 * a un ChartContainer con `aria-hidden="true"`, non lasciato come markup da
 * ricopiare a mano in ogni story/consumer.
 */
function ChartAccessibleTable<T>({
  caption,
  columns,
  data,
  className,
}: {
  caption: React.ReactNode;
  columns: ChartAccessibleTableColumn<T>[];
  data: T[];
  className?: string;
}) {
  const rowHeaderKey = columns.find((column) => column.isRowHeader)?.key ?? columns[0]?.key;

  return (
    <table className={cn("sr-only", className)}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) =>
              column.key === rowHeaderKey ? (
                <th key={column.key} scope="row">
                  {column.cell(row)}
                </th>
              ) : (
                <td key={column.key}>{column.cell(row)}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Aggiunge un canale alpha a un colore risolto (oklch/rgb/hsl) per un
 * riempimento "area" traslucido — es. `withAlpha(colors.aggio, 0.25)`.
 * Assume la sintassi moderna `colore(... / alpha)`, supportata dagli stessi
 * browser che risolvono `oklch()` via getComputedStyle.
 */
function withAlpha(color: string, alpha: number): string {
  if (!color || color.includes("/")) {
    return color;
  }
  return color.replace(/\)\s*$/, ` / ${alpha})`);
}

export {
  ChartContainer,
  ChartStyle,
  ChartLegend,
  ChartAccessibleTable,
  useChart,
  useChartColors,
  useChartTooltip,
  useChartScales,
  withAlpha,
};
