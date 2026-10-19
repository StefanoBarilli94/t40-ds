import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import {
  addDays,
  addMonths,
  fromDay,
  monthOf,
  placeWeek,
  toDay,
  weeksOfMonth,
  type EventCalendarEvent,
  type EventCalendarTone,
  type PlacedEvent,
} from "./event-calendar-layout";

export type { EventCalendarEvent, EventCalendarTone, PlacedEvent } from "./event-calendar-layout";

/**
 * Un mese con eventi che durano più giorni (issue #108), come in Google
 * Calendar: un evento è una barra che attraversa i giorni e, se finisce la
 * settimana, va a capo sulla riga dopo. Più eventi lo stesso giorno si
 * impilano; oltre `maxLanes` il giorno dice "+N".
 *
 * Non sostituisce `Calendar`, che serve a scegliere date: qui si guarda.
 * I giorni sono stringhe `AAAA-MM-GG` in ora locale, mai `Date` con fuso:
 * un evento a giorni interi non deve spostarsi di un giorno a mezzanotte.
 *
 * Accessibilità: il mese è una griglia (`role="grid"`); ci si entra con Tab
 * sul giorno scelto e ci si muove con le frecce, come in `Calendar`; Invio o
 * Spazio scelgono il giorno. Le barre sono decorative: ogni giorno dice a
 * parole i suoi eventi (`description` di ciascuno).
 */

export interface EventCalendarLabels {
  previous: string;
  next: string;
  /** "+2 altri" */
  more: (n: number) => string;
  /** "Nessun evento" */
  empty: string;
}

const ETICHETTE: EventCalendarLabels = {
  previous: "Mese precedente",
  next: "Mese successivo",
  more: (n) => `+${n} ${n === 1 ? "altro" : "altri"}`,
  empty: "nessuno",
};

export interface EventCalendarProps {
  /** Il mese mostrato, `AAAA-MM`. */
  month: string;
  onMonthChange: (month: string) => void;
  events: EventCalendarEvent[];
  /** Il giorno scelto, `AAAA-MM-GG`. */
  selected?: string;
  onSelect?: (day: string) => void;
  /** Oggi, `AAAA-MM-GG`: il numero è in grassetto. Default: oggi in ora locale. */
  today?: string;
  /** I giorni da segnare come "spenti" (per esempio un negozio chiuso): numero barrato. */
  isDayMuted?: (day: string) => boolean;
  /** Quante barre per giorno prima del "+N". Default 3. */
  maxLanes?: number;
  /** La lingua di mese e giorni della settimana. Default `it-IT`. */
  locale?: string;
  labels?: Partial<EventCalendarLabels>;
  className?: string;
}

// ---------------------------------------------------------------------------

const TONO: Record<EventCalendarTone, string> = {
  primary: "var(--primary)",
  positive: "var(--positive)",
  warning: "var(--warning)",
  negative: "var(--negative)",
  neutral: "var(--muted-foreground)",
};

function stileBarra(e: EventCalendarEvent, p: PlacedEvent): React.CSSProperties {
  const colore = TONO[e.tone ?? "primary"];
  const base: React.CSSProperties =
    e.variant === "outline"
      ? { backgroundColor: "var(--card)", border: `2px solid ${colore}` }
      : { backgroundColor: `color-mix(in oklab, ${colore} 16%, var(--card))` };
  // La riga del colore solo dove l'evento comincia davvero: se arriva dalla
  // settimana prima, la barra è "aperta" a sinistra.
  if (!p.continuesBefore && e.variant !== "outline") base.borderLeft = `3px solid ${colore}`;
  return base;
}

export function EventCalendar({
  month,
  onMonthChange,
  events,
  selected,
  onSelect,
  today = toDay(new Date()),
  isDayMuted,
  maxLanes = 3,
  locale = "it-IT",
  labels,
  className,
}: EventCalendarProps) {
  const testi = { ...ETICHETTE, ...labels };
  const weeks = React.useMemo(() => weeksOfMonth(month), [month]);
  const griglia = React.useRef<HTMLDivElement>(null);
  // Il giorno che riceve il Tab: lo scelto se è nel mese, altrimenti il primo.
  const [focusDay, setFocusDay] = React.useState(() => (selected && monthOf(selected) === month ? selected : `${month}-01`));
  const devoMettereFuoco = React.useRef(false);

  React.useEffect(() => {
    if (monthOf(focusDay) !== month) setFocusDay(selected && monthOf(selected) === month ? selected : `${month}-01`);
  }, [month, selected, focusDay]);

  React.useEffect(() => {
    if (!devoMettereFuoco.current) return;
    devoMettereFuoco.current = false;
    griglia.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)?.focus();
  }, [focusDay, month]);

  const titolo = fromDay(`${month}-01`).toLocaleDateString(locale, { month: "long", year: "numeric" });
  const nomiGiorni = weeks[0].map((d) => fromDay(d).toLocaleDateString(locale, { weekday: "short" }).replace(".", ""));
  const perEsteso = (d: string) => fromDay(d).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });

  const sposta = (d: string, n: number) => {
    const nuovo = addDays(d, n);
    devoMettereFuoco.current = true;
    if (monthOf(nuovo) !== month) onMonthChange(monthOf(nuovo));
    setFocusDay(nuovo);
  };

  const tasto = (e: React.KeyboardEvent, d: string) => {
    const passi: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in passi) {
      e.preventDefault();
      sposta(d, passi[e.key]);
    }
  };

  return (
    <div data-slot="event-calendar" className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" aria-label={testi.previous} onClick={() => onMonthChange(addMonths(month, -1))}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <p className="text-sm font-medium first-letter:uppercase" aria-live="polite">
          {titolo}
        </p>
        <Button variant="ghost" size="icon" aria-label={testi.next} onClick={() => onMonthChange(addMonths(month, 1))}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      <div ref={griglia} role="grid" aria-label={titolo} className="border-l border-t border-border">
        <div role="row" className="grid grid-cols-7">
          {nomiGiorni.map((n) => (
            <div
              key={n}
              role="columnheader"
              className="border-b border-r border-border py-1 text-center text-xs font-normal text-muted-foreground"
            >
              {n}
            </div>
          ))}
        </div>

        {weeks.map((week) => {
          const piazzati = placeWeek(week, events);
          const visibili = piazzati.filter((p) => p.lane < maxLanes);
          // Tutte le settimane alte uguali, come in Google Calendar: lo spazio
          // per le barre c'è sempre, così il mese non cambia forma da riga a riga.
          const corsie = maxLanes;
          return (
            <div
              key={week[0]}
              role="row"
              className="relative grid grid-cols-7"
              // Riga dei numeri, una riga per corsia, una per il "+N".
              style={{ gridTemplateRows: `1.75rem repeat(${corsie}, 1.5rem) 1.25rem` }}
            >
              {week.map((d, c) => {
                const delGiorno = events.filter((e) => e.start <= d && e.end >= d);
                const nascosti = piazzati.filter((p) => p.lane >= maxLanes && p.from <= c && p.to >= c).length;
                const fuori = monthOf(d) !== month;
                const scelto = d === selected;
                const etichetta = `${perEsteso(d)}: ${delGiorno.length ? delGiorno.map((e) => e.description).join("; ") : testi.empty}`;
                return (
                  <div key={d} role="gridcell" aria-selected={scelto} className="contents">
                    <button
                      type="button"
                      data-day={d}
                      tabIndex={d === focusDay ? 0 : -1}
                      aria-label={etichetta}
                      onClick={() => {
                        setFocusDay(d);
                        onSelect?.(d);
                      }}
                      onKeyDown={(e) => tasto(e, d)}
                      className={cn(
                        "relative border-b border-r border-border text-left transition-colors hover:bg-accent/40",
                        fuori && "bg-muted/40",
                        // Il giorno scelto: contorno del tema, non un fondo pieno che coprirebbe le barre.
                        scelto && "z-10 outline-2 -outline-offset-2 outline-primary",
                      )}
                      style={{ gridColumn: c + 1, gridRow: "1 / -1" }}
                    >
                      <span
                        className={cn(
                          "absolute left-1.5 top-1 text-xs tabular-nums",
                          fuori ? "text-muted-foreground" : "text-foreground",
                          d === today && "font-bold text-primary-text",
                          isDayMuted?.(d) && "line-through",
                        )}
                      >
                        {fromDay(d).getDate()}
                      </span>
                    </button>
                    {nascosti > 0 && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none z-20 truncate px-1.5 text-[0.6875rem] text-muted-foreground"
                        style={{ gridColumn: c + 1, gridRow: corsie + 2 }}
                      >
                        {testi.more(nascosti)}
                      </span>
                    )}
                  </div>
                );
              })}

              {visibili.map((p) => (
                <div
                  key={p.event.id}
                  aria-hidden="true"
                  className="pointer-events-none z-20 mx-0.5 my-px flex min-w-0 items-center gap-1 overflow-hidden px-1 text-xs text-foreground"
                  style={{ gridColumn: `${p.from + 1} / ${p.to + 2}`, gridRow: p.lane + 2, ...stileBarra(p.event, p) }}
                >
                  {p.continuesBefore && <ChevronLeftIcon className="size-3 shrink-0 text-muted-foreground" />}
                  {p.event.leading}
                  <span className="min-w-0 truncate font-medium">{p.event.label}</span>
                  {p.continuesAfter && <ChevronRightIcon className="ml-auto size-3 shrink-0 text-muted-foreground" />}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
