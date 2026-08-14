import * as React from "react";

import { cn } from "../../lib/utils";
import { Input } from "./input";

/**
 * Converte il testo digitato nel numero corrispondente. `null` se non è un
 * numero valido o il campo è vuoto — non 0, per distinguere "vuoto" da "zero"
 * nel form.
 *
 * Il formato it-IT vuole il punto per le migliaia e la virgola per i decimali,
 * ma chi digita in fretta usa spesso il punto come separatore decimale (è
 * quello del tastierino numerico). Prima il punto veniva tolto sempre, quindi
 * `1.30` diventava **130 euro** invece di uno e trenta (issue #64).
 *
 * L'unico segnale per distinguere i due casi è **quante cifre seguono il
 * punto**: un gruppo di migliaia ne ha sempre esattamente tre.
 *
 * | Digitato | Letto come | Perché |
 * |---|---|---|
 * | `1.234,56` | 1234.56 | ci sono entrambi: punto = migliaia, virgola = decimali |
 * | `1,30` | 1.3 | solo virgola = decimale |
 * | `1.400` | 1400 | gruppo di 3 cifre = migliaia |
 * | `1.400.000` | 1400000 | più gruppi da 3 |
 * | `1.30` | 1.3 | 2 cifre: non è un raggruppamento valido |
 * | `1.3` | 1.3 | 1 cifra: idem |
 *
 * Resta ambiguo `1.400` inteso come "uno virgola quattro": vince la lettura
 * italiana (millequattrocento). È il compromesso giusto per un gestionale
 * dove gli importi a quattro cifre sono all'ordine del giorno, e nessuno
 * scrive i decimali con tre cifre.
 */
function parseAmount(raw: string): number | null {
  const testo = raw.trim();
  if (testo === "") return null;

  let normalizzato: string;
  if (testo.includes(",")) {
    // Con la virgola in campo non c'è ambiguità: è lei il separatore decimale
    // e ogni punto è un raggruppamento di migliaia.
    normalizzato = testo.replace(/\./g, "").replace(",", ".");
  } else if (testo.includes(".")) {
    const parti = testo.split(".");
    const sonoMigliaia =
      /^-?\d{1,3}$/.test(parti[0]) && parti.slice(1).every((p) => /^\d{3}$/.test(p));
    normalizzato = sonoMigliaia ? parti.join("") : testo;
  } else {
    normalizzato = testo;
  }

  const n = Number(normalizzato);
  return Number.isNaN(n) ? null : n;
}

function formatAmount(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  // useGrouping va passato esplicitamente: senza, il separatore delle
  // migliaia non viene applicato (verificato — "1.284,50" diventa "1284,50").
  return value.toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
}

export type CurrencyInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type"
> & {
  /** Importo in euro. `null`/`undefined` = campo vuoto, non 0. */
  value?: number | null;
  onValueChange?: (value: number | null) => void;
};

/**
 * Input per importi in euro (issue: "l'utente inserisce o sceglie valori in
 * valuta €"). Simbolo "€" come indicatore visivo fisso (non editabile, non fa
 * parte del valore), formattazione it-IT (virgola decimale, punto delle
 * migliaia) applicata al blur — durante la digitazione il testo resta libero
 * per non combattere con l'utente mentre scrive. Il valore esposto a
 * `onValueChange` è sempre un number (o null), mai una stringa formattata:
 * chi consuma il componente non deve fare parsing locale-aware da solo.
 *
 * Per un importo scelto da una lista (Select) invece che digitato, non serve
 * un componente dedicato: basta formattare l'option label con la stessa
 * convenzione it-IT, es. `importo.toLocaleString("it-IT", { style: "currency", currency: "EUR" })`.
 */
const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onValueChange, onBlur, onFocus, ...props }, ref) => {
    const [text, setText] = React.useState(() => formatAmount(value));
    const [editing, setEditing] = React.useState(false);

    React.useEffect(() => {
      if (!editing) setText(formatAmount(value));
    }, [value, editing]);

    return (
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-muted-foreground md:text-sm"
        >
          €
        </span>
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          className={cn("pl-7 text-right tabular-nums", className)}
          value={text}
          onChange={(event) => {
            const raw = event.target.value;
            setText(raw);
            onValueChange?.(parseAmount(raw));
          }}
          onFocus={(event) => {
            setEditing(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setEditing(false);
            const parsed = parseAmount(event.target.value);
            setText(formatAmount(parsed));
            onBlur?.(event);
          }}
          {...props}
        />
      </div>
    );
  },
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput, parseAmount, formatAmount };
