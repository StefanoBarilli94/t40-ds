import { describe, expect, it } from "vitest";

import { parseAmount } from "./currency-input";

/**
 * Il parsing degli importi è il punto in cui un errore non si vede a schermo
 * ma finisce nel database: `1.30` letto come 130 euro non dà nessun segnale
 * all'utente (issue #64). Questi test fissano la regola.
 */
describe("parseAmount", () => {
  it("con la virgola non c'è ambiguità: virgola decimale, punti migliaia", () => {
    expect(parseAmount("1,30")).toBe(1.3);
    expect(parseAmount("1.234,56")).toBe(1234.56);
    expect(parseAmount("1.400.000,99")).toBe(1400000.99);
    expect(parseAmount("0,05")).toBe(0.05);
  });

  it("legge il punto come decimale quando non può essere un raggruppamento", () => {
    // È il caso dell'issue #64: 2 cifre dopo il punto non formano un gruppo
    // di migliaia, quindi il punto è il separatore decimale del tastierino.
    expect(parseAmount("1.30")).toBe(1.3);
    expect(parseAmount("1.3")).toBe(1.3);
    expect(parseAmount("12.50")).toBe(12.5);
    expect(parseAmount("0.99")).toBe(0.99);
  });

  it("legge il punto come migliaia quando i gruppi sono da tre cifre", () => {
    expect(parseAmount("1.400")).toBe(1400);
    expect(parseAmount("12.345")).toBe(12345);
    expect(parseAmount("1.400.000")).toBe(1400000);
  });

  it("senza separatori resta un numero intero", () => {
    expect(parseAmount("1400")).toBe(1400);
    expect(parseAmount("0")).toBe(0);
  });

  it("un raggruppamento malformato vale come decimale, non come migliaia", () => {
    // 4 cifre dopo il punto non sono un gruppo valido: meglio leggerlo come
    // decimale che moltiplicare l'importo per diecimila.
    expect(parseAmount("1.4000")).toBe(1.4);
  });

  it("regge il segno negativo", () => {
    expect(parseAmount("-1,30")).toBe(-1.3);
    expect(parseAmount("-1.30")).toBe(-1.3);
    expect(parseAmount("-1.400")).toBe(-1400);
  });

  it("restituisce null per vuoto e non numerico, mai 0", () => {
    // `null` e non 0: nel form "vuoto" e "zero" sono due cose diverse.
    expect(parseAmount("")).toBeNull();
    expect(parseAmount("   ")).toBeNull();
    expect(parseAmount("abc")).toBeNull();
    expect(parseAmount("1,2,3")).toBeNull();
  });

  it("ignora gli spazi attorno", () => {
    expect(parseAmount("  1.234,56  ")).toBe(1234.56);
  });
});
