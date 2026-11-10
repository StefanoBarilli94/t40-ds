import * as React from "react";

import { cn } from "../../lib/utils";
import type { chartColors } from "./chart-presets";

interface ChartLegendProps extends React.ComponentProps<"ul"> {
  series: readonly { name: string; color: (typeof chartColors)[number] }[];
}

const ChartLegend = React.forwardRef<HTMLUListElement, ChartLegendProps>(
  ({ series, className, ...props }, ref) => (
    <ul
      ref={ref}
      role="list"
      data-slot="chart-legend"
      className={cn("flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      {series.map(({ name, color }) => (
        <li key={color} className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="size-3 shrink-0" style={{ backgroundColor: color }} />
          <span className="break-words">{name}</span>
        </li>
      ))}
    </ul>
  ),
);
ChartLegend.displayName = "ChartLegend";

type Valore = number | string | (number | string)[];
type Voce = {
  value?: Valore;
  name?: number | string;
  dataKey?: unknown;
  unit?: React.ReactNode;
  formatter?: ChartTooltipFormatter;
};
type ChartTooltipFormatter = (
  value: Valore,
  name: number | string,
  item: Voce,
  index: number,
  payload: Voce[],
) => React.ReactNode | [React.ReactNode, React.ReactNode];

/**
 * Le props che Recharts passa al `content` del suo `Tooltip`. Scritte qui e
 * non prese da "recharts": il design system non deve dipendere da Recharts per
 * compilare, perché gt40 non lo usa (lo installano solo le app con i grafici).
 */
export interface ChartTooltipProps {
  active?: boolean;
  payload?: Voce[];
  label?: React.ReactNode;
  labelFormatter?: (label: React.ReactNode, payload: Voce[]) => React.ReactNode;
  formatter?: ChartTooltipFormatter;
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, label, labelFormatter, formatter }, ref) => {
    if (!active || !payload?.length) return null;

    return (
      <div ref={ref} data-slot="chart-tooltip" className="border border-border bg-popover p-3 text-sm text-foreground">
        <p className="font-semibold">{labelFormatter ? labelFormatter(label, payload) : label}</p>
        <dl className="mt-1 space-y-1">
          {payload.map((item, index) => {
            const { value, name } = item;
            if (value == null || name == null) return null;
            const formatted = (item.formatter ?? formatter)?.(value, name, item, index, payload);
            const [displayValue, displayName] = Array.isArray(formatted) && formatted.length === 2
              ? formatted
              : [formatted ?? (Array.isArray(value) ? value.join(" – ") : value), name];
            return (
              <div key={String(item.dataKey ?? name)} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{displayName}</dt>
                <dd className="font-medium tabular-nums">{displayValue}{item.unit}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartLegend, ChartTooltipContent };
