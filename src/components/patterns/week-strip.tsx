import * as React from "react";

import { cn } from "../../lib/utils";

export interface WeekStripDay {
  id: string;
  label: string;
  shortLabel: string;
  day: string | number;
  today?: boolean;
  status: { label: string; icon: React.ReactElement };
}

export interface WeekStripProps extends React.ComponentPropsWithoutRef<"div"> {
  days: readonly WeekStripDay[];
  selected: string;
  onSelectDay: (id: string) => void;
}

/** Sette giorni, ciascuno con la data e un'icona che ne indica lo stato. */
export const WeekStrip = React.forwardRef<HTMLDivElement, WeekStripProps>(
  ({ days, selected, onSelectDay, className, "aria-label": label = "Giorni della settimana", ...props }, ref) => (
    <div {...props} ref={ref} data-slot="week-strip" role="group" aria-label={label}
      className={cn("grid grid-cols-7 gap-1", className)}
    >
      {days.map((giorno) => {
        const attivo = giorno.id === selected;
        return (
          <button
            key={giorno.id}
            type="button"
            aria-current={attivo ? "date" : undefined}
            aria-label={`${giorno.label}, ${giorno.status.label}${giorno.today ? ", oggi" : ""}`}
            onClick={() => onSelectDay(giorno.id)}
            className={cn(
              "flex min-h-16 min-w-0 flex-col items-center justify-center gap-0.5 border px-0.5 py-1.5 text-xs transition-colors",
              attivo
                ? "border-selected-border bg-primary-subtle font-semibold text-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            <span className="max-w-full truncate">{giorno.shortLabel}</span>
            <span className={cn("text-base leading-none text-foreground", giorno.today && "underline underline-offset-4")}>
              {giorno.day}
            </span>
            <span aria-hidden="true" className="mt-0.5 [&>svg]:size-3.5">{giorno.status.icon}</span>
          </button>
        );
      })}
    </div>
  ),
);
WeekStrip.displayName = "WeekStrip";
