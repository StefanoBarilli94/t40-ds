import * as React from "react";

import { cn } from "../../lib/utils";

export interface StatProps extends React.ComponentPropsWithoutRef<"dl"> {
  columns?: 2 | 3 | 4;
}

const COLONNE = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;

/** Elenco di valori con le loro etichette, disposto da due a quattro colonne. */
export const Stat = React.forwardRef<HTMLDListElement, StatProps>(
  ({ columns = 3, className, ...props }, ref) => (
    <dl {...props} ref={ref} data-slot="stat" className={cn("grid gap-2", COLONNE[columns], className)} />
  ),
);
Stat.displayName = "Stat";

export interface StatItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const StatItem = React.forwardRef<HTMLDivElement, StatItemProps>(
  ({ label, value, className, ...props }, ref) => (
    <div {...props} ref={ref} data-slot="stat-item" className={cn("min-w-0", className)}>
      <dt className="break-words text-xs text-muted-foreground">{label}</dt>
      <dd className="break-words text-2xl font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  ),
);
StatItem.displayName = "StatItem";
