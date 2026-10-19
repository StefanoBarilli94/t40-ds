import { describe, expect, it } from "vitest";

import { placeWeek, weeksOfMonth, type EventCalendarEvent } from "./event-calendar-layout";

const ev = (id: string, start: string, end: string): EventCalendarEvent => ({ id, start, end, label: id, description: id });

describe("weeksOfMonth", () => {
  it("copre il mese con settimane da lunedì a domenica", () => {
    const ottobre = weeksOfMonth("2026-10");
    expect(ottobre).toHaveLength(5);
    expect(ottobre[0][0]).toBe("2026-09-28");
    expect(ottobre[4][6]).toBe("2026-11-01");
    // Un mese che comincia di lunedì non ha giorni del mese prima.
    expect(weeksOfMonth("2027-02")[0][0]).toBe("2027-02-01");
  });
});

describe("placeWeek (issue #108)", () => {
  const settimana = weeksOfMonth("2026-10")[4]; // 26 ottobre – 1 novembre

  it("una barra per evento, dalla colonna d'inizio a quella di fine, tagliata alla settimana", () => {
    const [p] = placeWeek(settimana, [ev("monica", "2026-10-28", "2026-11-03")]);
    expect(p).toMatchObject({ from: 2, to: 6, lane: 0, continuesBefore: false, continuesAfter: true });
    const [q] = placeWeek(weeksOfMonth("2026-11")[1], [ev("monica", "2026-10-28", "2026-11-03")]);
    expect(q).toMatchObject({ from: 0, to: 1, continuesBefore: true, continuesAfter: false });
  });

  it("gli eventi che si toccano vanno su corsie diverse; quelli che non si toccano riusano la corsia", () => {
    const piazzati = placeWeek(settimana, [
      ev("paola", "2026-10-26", "2026-10-30"),
      ev("monica", "2026-10-28", "2026-11-03"),
      ev("ilaria", "2026-10-27", "2026-10-28"),
      ev("andrea", "2026-10-31", "2026-10-31"),
    ]);
    const corsia = Object.fromEntries(piazzati.map((p) => [p.event.id, p.lane]));
    expect(corsia).toEqual({ paola: 0, ilaria: 1, monica: 2, andrea: 0 });
  });

  it("gli eventi fuori dalla settimana non ci sono", () => {
    expect(placeWeek(settimana, [ev("x", "2026-11-05", "2026-11-06")])).toEqual([]);
  });
});
