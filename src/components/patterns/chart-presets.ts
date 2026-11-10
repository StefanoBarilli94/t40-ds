// Valori semplici, senza tipi di "recharts": il design system compila anche
// nelle app che non installano Recharts (gt40).

export const chartColors = [
  "var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)",
  "var(--chart-5)", "var(--chart-6)", "var(--chart-7)", "var(--chart-8)",
] as const;

export const chartAxisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
  minTickGap: 12,
} as const;

export const chartGridProps = {
  stroke: "var(--border)",
  strokeDasharray: "3 3",
  vertical: false,
} as const;
