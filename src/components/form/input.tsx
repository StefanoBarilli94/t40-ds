import * as React from "react";
import { CalendarDays, Clock } from "lucide-react";

import { cn } from "../../lib/utils";

/** I campi con un selettore di sistema (calendario, orologio). */
const CON_SELETTORE = new Set(["date", "time", "datetime-local", "month", "week"]);

const CLASSI = cn(
  // Un campo in errore (aria-invalid) è rosso da solo, bordo e anello di
  // focus: le app non devono ricordarsi di aggiungere classi (issue #88).
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:outline-destructive",
  // bg-card (bianco), non bg-background: un campo form è una superficie
  // sopra la pagina, deve distinguersi da ciò che lo circonda — non
  // fondersi quando il contenitore intorno usa già --background.
  "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted md:text-sm",
);

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    if (!type || !CON_SELETTORE.has(type)) {
      return <input type={type} className={cn(CLASSI, className)} ref={ref} {...props} />;
    }

    // Date e ore hanno un'icona nostra, sempre a destra (issue #89): Safari iOS
    // non ne disegna nessuna, e quella di Chrome si spostava col layout (issue
    // #24 e #85). Quella di Chrome resta, invisibile e stesa su tutto il campo
    // (vedi index.css), così un tocco ovunque apre il calendario.
    // `items-center` tiene la data al centro in verticale anche su iPhone,
    // dove il campo ha `appearance: none`.
    //
    // Il campo sta in un contenitore largo quanto il genitore: `className` va
    // all'input, quindi una larghezza diversa si dà a chi lo contiene.
    const Icona = type === "time" ? Clock : CalendarDays;
    return (
      <div className="relative w-full min-w-0">
        <input
          type={type}
          className={cn(CLASSI, "peer relative items-center pr-10", className)}
          ref={ref}
          {...props}
        />
        <Icona
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-disabled:opacity-50"
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
