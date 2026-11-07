import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../patterns/popover";
import { Input } from "./input";

const due = (n: number) => String(n).padStart(2, "0");

/**
 * Legge un orario scritto come viene: `null` se il campo è vuoto o se non è
 * un orario. Sempre 24 ore.
 *
 * | Scritto | Letto come |
 * |---|---|
 * | `7.30`, `7:30`, `7,30`, `7 30`, `7h30` | 07:30 |
 * | `730`, `0730` | 07:30 |
 * | `1530` | 15:30 |
 * | `7`, `07` | 07:00 |
 * | `7.3` | 07:30 (una cifra dopo il separatore sono le decine) |
 * | `24:00`, `7.75`, `ciao` | `null` |
 */
function parseOrario(raw: string): string | null {
  const testo = raw.trim().toLowerCase();
  if (testo === "") return null;

  let ore: number;
  let minuti: number;
  const separato = /^(\d{1,2})\s*[.:,h\s]\s*(\d{1,2})$/.exec(testo);
  if (separato) {
    ore = Number(separato[1]);
    // "7.3" è sette e mezza, non sette e tre.
    minuti = separato[2].length === 1 ? Number(separato[2]) * 10 : Number(separato[2]);
  } else if (/^\d{1,2}$/.test(testo)) {
    ore = Number(testo);
    minuti = 0;
  } else if (/^\d{3,4}$/.test(testo)) {
    // Le ultime due cifre sono i minuti: "730" → 7:30, "1530" → 15:30.
    ore = Number(testo.slice(0, -2));
    minuti = Number(testo.slice(-2));
  } else {
    return null;
  }

  if (ore > 23 || minuti > 59) return null;
  return `${due(ore)}:${due(minuti)}`;
}

/** Gli orari dell'elenco, da `da` ad `a` compresi, ogni `passo` minuti. */
function orariDellElenco(da: string, a: string, passo: number): string[] {
  const minutiDi = (o: string) => Number(o.slice(0, 2)) * 60 + Number(o.slice(3, 5));
  const orari: string[] = [];
  for (let m = minutiDi(da); m <= minutiDi(a); m += Math.max(1, passo)) {
    orari.push(`${due(Math.floor(m / 60))}:${due(m % 60)}`);
  }
  return orari;
}

export type TimeInputProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "type"> & {
  /** "HH:MM" a 24 ore; stringa vuota = campo vuoto. Lo stesso formato di `input type="time"`. */
  value?: string;
  /** "HH:MM" se l'orario è valido, `null` se il campo è vuoto o non è un orario. */
  onValueChange?: (value: string | null) => void;
  /** Il primo orario dell'elenco. Default "00:00". */
  da?: string;
  /** L'ultimo orario dell'elenco. Default "23:45". */
  a?: string;
  /** Minuti fra un orario e l'altro nell'elenco. Default 15. */
  passo?: number;
  /** Dove si apre l'elenco quando il campo è vuoto. Default "08:00". */
  vicino?: string;
  /** Etichetta del pulsante che apre l'elenco, per gli screen reader. */
  etichettaElenco?: string;
};

/**
 * Orario a 24 ore (issue #114, ft40#277). Il campo del browser
 * (`type="time"`) su Chrome per computer si cambia una cifra alla volta con
 * le frecce: qui invece si scrive come viene ("7.30", "730", "7") e quando si
 * esce dal campo diventa "07:30"; oppure si sceglie dall'elenco che si apre
 * con l'orologio, a passi di 15 minuti.
 *
 * Nell'elenco ogni orario è un pulsante: si raggiunge con Tab e si sceglie con
 * Invio o Spazio, come ogni altra scelta (ft40#191). All'apertura il fuoco va
 * sull'orario scelto, o sul più vicino.
 *
 * Un testo che non è un orario resta scritto com'è e il campo diventa rosso
 * (`aria-invalid`): niente correzioni silenziose.
 */
const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      className,
      value = "",
      onValueChange,
      onBlur,
      onFocus,
      da = "00:00",
      a = "23:45",
      passo = 15,
      vicino = "08:00",
      etichettaElenco = "Scegli dall'elenco",
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const [testo, setTesto] = React.useState(value);
    const [scrivendo, setScrivendo] = React.useState(false);
    const [aperto, setAperto] = React.useState(false);
    const elenco = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
      if (!scrivendo) setTesto(value);
    }, [value, scrivendo]);

    const orari = React.useMemo(() => orariDellElenco(da, a, passo), [da, a, passo]);
    // Il più vicino a quello scelto (o a `vicino`): all'apertura l'elenco parte da lì.
    const riferimento = parseOrario(testo) ?? vicino;
    // L'ultimo orario dell'elenco che non supera il riferimento; se sono tutti dopo, il primo.
    const piuVicino = orari.filter((o) => o <= riferimento).pop() ?? orari[0];
    const nonValido = !scrivendo && testo.trim() !== "" && parseOrario(testo) === null;

    const scegli = (orario: string) => {
      setTesto(orario);
      onValueChange?.(orario);
      setAperto(false);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="00:00"
          disabled={disabled}
          aria-invalid={ariaInvalid ?? (nonValido || undefined)}
          className={cn("pr-10 tabular-nums", className)}
          value={testo}
          onChange={(event) => {
            setTesto(event.target.value);
            onValueChange?.(parseOrario(event.target.value));
          }}
          onFocus={(event) => {
            setScrivendo(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setScrivendo(false);
            const letto = parseOrario(event.target.value);
            // Si normalizza solo un orario valido: il testo sbagliato resta, da correggere.
            if (letto) setTesto(letto);
            onBlur?.(event);
          }}
          {...props}
        />
        <Popover open={aperto} onOpenChange={setAperto}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              aria-label={etichettaElenco}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <Clock aria-hidden="true" className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="max-h-64 w-32 overflow-y-auto p-1"
            onOpenAutoFocus={(event) => {
              // Il fuoco sull'orario scelto, o sul più vicino, già in vista.
              event.preventDefault();
              // Un fotogramma dopo: all'apertura l'elenco non è ancora al suo posto.
              requestAnimationFrame(() => {
                const voce = elenco.current?.querySelector<HTMLButtonElement>(`[data-orario="${piuVicino}"]`);
                voce?.scrollIntoView({ block: "center" });
                voce?.focus();
              });
            }}
          >
            <ul ref={elenco} aria-label={etichettaElenco} className="grid gap-0.5">
              {orari.map((orario) => {
                const scelto = orario === parseOrario(testo);
                return (
                  <li key={orario}>
                    <button
                      type="button"
                      data-orario={orario}
                      aria-pressed={scelto}
                      onClick={() => scegli(orario)}
                      className={cn(
                        "flex h-9 w-full items-center justify-center text-sm tabular-nums transition-colors hover:bg-accent hover:text-accent-foreground",
                        scelto && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      {orario}
                    </button>
                  </li>
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
TimeInput.displayName = "TimeInput";

export { TimeInput, parseOrario, orariDellElenco };
