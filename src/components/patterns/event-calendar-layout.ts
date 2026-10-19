import type * as React from "react";

/**
 * La parte di `EventCalendar` senza interfaccia (issue #108): date locali come
 * stringhe `AAAA-MM-GG`, le settimane di un mese e dove stanno le barre.
 */

export type EventCalendarTone = "primary" | "positive" | "warning" | "negative" | "neutral";

export interface EventCalendarEvent {
  id: string;
  /** Primo giorno, `AAAA-MM-GG`. */
  start: string;
  /** Ultimo giorno, compreso, `AAAA-MM-GG`. */
  end: string;
  /** Cosa si legge nella barra: un nome, breve. */
  label: React.ReactNode;
  /** Prima del testo, per esempio un avatar. Decorativo. */
  leading?: React.ReactNode;
  tone?: EventCalendarTone;
  /**
   * `solid` (default): fondo tenue e riga del colore a sinistra.
   * `outline`: solo il contorno, per un evento proposto.
   * `filled`: fondo pieno del colore, per l'evento in primo piano (per esempio la richiesta che si sta guardando).
   */
  variant?: "solid" | "outline" | "filled";
  /** Come lo legge lo screen reader nel giorno: "Paola, ferie da decidere". */
  description: string;
}

// ---------------------------------------------------------------------------
// Date locali come stringhe

export const pad = (n: number) => String(n).padStart(2, "0");
export const toDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromDay = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const addDays = (s: string, n: number) => {
  const d = fromDay(s);
  d.setDate(d.getDate() + n);
  return toDay(d);
};
export const monthOf = (s: string) => s.slice(0, 7);
export const addMonths = (month: string, n: number) => {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

/** Le settimane (lunedì–domenica) che coprono il mese, giorno per giorno. */
export function weeksOfMonth(month: string): string[][] {
  const first = `${month}-01`;
  const dow = (fromDay(first).getDay() + 6) % 7; // 0 = lunedì
  let day = addDays(first, -dow);
  const weeks: string[][] = [];
  do {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  } while (monthOf(day) === month);
  return weeks;
}

export interface PlacedEvent {
  event: EventCalendarEvent;
  /** Colonna di inizio e di fine nella settimana, da 0 (lunedì) a 6. */
  from: number;
  to: number;
  lane: number;
  /** L'evento cominciava prima di questa settimana / continua dopo. */
  continuesBefore: boolean;
  continuesAfter: boolean;
}

/**
 * Dove stanno le barre in una settimana: ogni evento prende la prima corsia
 * libera per tutti i suoi giorni. Prima chi comincia prima, a pari inizio il
 * più lungo, così le barre lunghe restano in alto e non si spezzano.
 */
export function placeWeek(week: string[], events: EventCalendarEvent[]): PlacedEvent[] {
  const first = week[0];
  const last = week[6];
  const inWeek = events
    .filter((e) => e.start <= last && e.end >= first)
    .sort((a, b) => a.start.localeCompare(b.start) || b.end.localeCompare(a.end) || a.id.localeCompare(b.id));
  const lanes: boolean[][] = [];
  return inWeek.map((event) => {
    const from = event.start < first ? 0 : week.indexOf(event.start);
    const to = event.end > last ? 6 : week.indexOf(event.end);
    let lane = 0;
    while (lanes[lane]?.slice(from, to + 1).some(Boolean)) lane++;
    lanes[lane] ??= Array(7).fill(false);
    for (let c = from; c <= to; c++) lanes[lane][c] = true;
    return { event, from, to, lane, continuesBefore: event.start < first, continuesAfter: event.end > last };
  });
}

