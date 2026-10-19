import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
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
 * Accessibilità: il mese è una griglia (`role="grid"`). Con `onSelect` i
 * giorni si scelgono: ci si entra con Tab sul giorno scelto e ci si muove con
 * le frecce, come in `Calendar`; Invio o Spazio scelgono. Senza, i giorni non
 * sono interattivi (niente manina, niente tappa di Tab). Ogni giorno dice a
 * parole i suoi eventi (`description` di ciascuno). Con `renderEventDetails`
 * le barre sono bottoni, raggiungibili con Tab, che aprono un riquadro con i
 * dettagli (issue #110); altrimenti sono decorative.
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
  /** Un'icona accanto al numero del giorno (per esempio il negozio chiuso). Decorativa: il significato va in `dayDescription`. */
  dayIcon?: (day: string) => React.ReactNode;
  /** Cosa dice a parole il giorno oltre agli eventi (per esempio "negozio chiuso"). */
  dayDescription?: (day: string) => string | undefined;
  /** Con questo, l'icona del giorno (`dayIcon`) si clicca e apre un riquadro con ciò che restituisce. */
  renderDayDetails?: (day: string) => React.ReactNode;
  /** Con questo, cliccando una barra si apre un riquadro con ciò che restituisce. */
  renderEventDetails?: (event: EventCalendarEvent) => React.ReactNode;
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
  if (e.variant === "filled") {
    // Fondo pieno: il testo è quello pensato per stare sopra il colore.
    return { backgroundColor: colore, color: (e.tone ?? "primary") === "primary" ? "var(--primary-foreground)" : "var(--card)" };
  }
  const base: React.CSSProperties =
    e.variant === "outline"
      ? { backgroundColor: "var(--card)", border: `2px solid ${colore}` }
      : { backgroundColor: `color-mix(in oklab, ${colore} 16%, var(--card))` };
  // La riga del colore solo dove l'evento comincia davvero: se arriva dalla
  // settimana prima, la barra è "aperta" a sinistra.
  if (!p.continuesBefore && e.variant !== "outline") base.borderLeft = `3px solid ${colore}`;
  return base;
}

/** Il contenuto di una barra: frecce se continua, ciò che precede, il testo. */
function ContenutoBarra({ p }: { p: PlacedEvent }) {
  return (
    <>
      {p.continuesBefore && <ChevronLeftIcon className="size-3 shrink-0 opacity-70" />}
      {p.event.leading}
      <span className="min-w-0 truncate font-medium">{p.event.label}</span>
      {p.continuesAfter && <ChevronRightIcon className="ml-auto size-3 shrink-0 opacity-70" />}
    </>
  );
}

export function EventCalendar({
  month,
  onMonthChange,
  events,
  selected,
  onSelect,
  today = toDay(new Date()),
  isDayMuted,
  dayIcon,
  dayDescription,
  renderEventDetails,
  renderDayDetails,
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
                const extra = dayDescription?.(d);
                const eventiDetti = delGiorno.length ? delGiorno.map((e) => e.description).join("; ") : testi.empty;
                const etichetta = `${perEsteso(d)}${extra ? `, ${extra}` : ""}: ${eventiDetti}`;
                const icona = dayIcon?.(d);
                // Con i dettagli del giorno l'icona diventa un bottone che li apre (issue #110).
                const dettagliGiorno = icona ? renderDayDetails?.(d) : null;
                const numero = (
                  <>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-1.5 top-1 text-xs tabular-nums",
                        fuori ? "text-muted-foreground" : "text-foreground",
                        d === today && "font-bold text-primary-text",
                        isDayMuted?.(d) && "line-through",
                      )}
                    >
                      {fromDay(d).getDate()}
                    </span>
                    {icona && !dettagliGiorno && (
                      <span aria-hidden="true" className="absolute right-1 top-0.5 text-muted-foreground [&_svg]:size-5">
                        {icona}
                      </span>
                    )}
                  </>
                );
                const cella = cn("relative border-b border-r border-border text-left", fuori && "bg-muted/40");
                return (
                  <div key={d} role="gridcell" aria-selected={onSelect ? scelto : undefined} className="contents">
                    {onSelect ? (
                      <button
                        type="button"
                        data-day={d}
                        tabIndex={d === focusDay ? 0 : -1}
                        aria-label={etichetta}
                        onClick={() => {
                          setFocusDay(d);
                          onSelect(d);
                        }}
                        onKeyDown={(e) => tasto(e, d)}
                        className={cn(
                          cella,
                          "transition-colors hover:bg-accent/40",
                          // Il giorno scelto: contorno del tema, non un fondo pieno che coprirebbe le barre.
                          scelto && "z-10 outline-2 -outline-offset-2 outline-primary",
                        )}
                        style={{ gridColumn: c + 1, gridRow: "1 / -1" }}
                      >
                        {numero}
                      </button>
                    ) : (
                      // Giorni che non si scelgono: niente bottone e niente manina; lo
                      // screen reader legge lo stesso il giorno e i suoi eventi.
                      <div data-day={d} className={cella} style={{ gridColumn: c + 1, gridRow: "1 / -1" }}>
                        <span className="sr-only">{etichetta}</span>
                        {numero}
                      </div>
                    )}
                    {dettagliGiorno && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            aria-label={extra ?? perEsteso(d)}
                            className="z-30 m-0.5 inline-flex size-7 cursor-pointer items-center justify-self-end text-muted-foreground hover:text-foreground [&_svg]:mx-auto [&_svg]:size-5"
                            style={{ gridColumn: c + 1, gridRow: 1 }}
                          >
                            {icona}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-72">
                          {dettagliGiorno}
                        </PopoverContent>
                      </Popover>
                    )}
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

              {visibili.map((p) => {
                const posto: React.CSSProperties = {
                  gridColumn: `${p.from + 1} / ${p.to + 2}`,
                  gridRow: p.lane + 2,
                  ...stileBarra(p.event, p),
                };
                const barra = "z-20 mx-0.5 my-px flex min-w-0 items-center gap-1 overflow-hidden px-1 text-xs text-foreground";
                if (!renderEventDetails) {
                  return (
                    <div key={p.event.id} aria-hidden="true" className={cn(barra, "pointer-events-none")} style={posto}>
                      <ContenutoBarra p={p} />
                    </div>
                  );
                }
                // Cliccabile: un bottone vero, raggiungibile con Tab, che apre i dettagli.
                return (
                  <div key={p.event.id} role="gridcell" className="contents">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label={p.event.description}
                          className={cn(barra, "cursor-pointer text-left hover:brightness-95")}
                          style={posto}
                        >
                          <ContenutoBarra p={p} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-72">
                        {renderEventDetails(p.event)}
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
