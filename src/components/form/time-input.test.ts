import { describe, expect, it } from "vitest";

import { orariDellElenco, parseOrario } from "./time-input";

/** Come si scrive un orario di fretta, e cosa diventa (issue #114, ft40#277). */
describe("parseOrario", () => {
  it("accetta ogni separatore: punto, due punti, virgola, spazio, h", () => {
    for (const scritto of ["7.30", "7:30", "7,30", "7 30", "7h30", "07.30", " 7.30 "]) {
      expect(parseOrario(scritto)).toBe("07:30");
    }
  });

  it("senza separatore le ultime due cifre sono i minuti", () => {
    expect(parseOrario("730")).toBe("07:30");
    expect(parseOrario("0730")).toBe("07:30");
    expect(parseOrario("1530")).toBe("15:30");
    expect(parseOrario("000")).toBe("00:00");
  });

  it("solo l'ora vale come ora intera", () => {
    expect(parseOrario("7")).toBe("07:00");
    expect(parseOrario("07")).toBe("07:00");
    expect(parseOrario("20")).toBe("20:00");
  });

  it("una cifra dopo il separatore sono le decine di minuti", () => {
    expect(parseOrario("7.3")).toBe("07:30");
    expect(parseOrario("13:4")).toBe("13:40");
  });

  it("vuoto o non orario: null, mai un orario inventato", () => {
    for (const scritto of ["", "  ", "24:00", "7.75", "2400", "ciao", "7.30.00", "12345", "-7"]) {
      expect(parseOrario(scritto)).toBeNull();
    }
  });
});

describe("orariDellElenco", () => {
  it("dal primo all'ultimo compresi, ogni passo", () => {
    expect(orariDellElenco("07:00", "08:00", 15)).toEqual(["07:00", "07:15", "07:30", "07:45", "08:00"]);
    expect(orariDellElenco("00:00", "23:45", 15)).toHaveLength(96);
    expect(orariDellElenco("13:00", "14:00", 30)).toEqual(["13:00", "13:30", "14:00"]);
  });
});
