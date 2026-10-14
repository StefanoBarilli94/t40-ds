import * as React from "react";

import { cn } from "../../lib/utils";

/** I campi che Chrome disegna con un'icona propria (calendario, orologio). */
const CON_SELETTORE = new Set(["date", "time", "datetime-local", "month", "week"]);

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Date e ore sono `block`, non `flex` (issue #85): con `flex` Chrome
          // lascia l'icona del calendario attaccata alla data, a metà del campo,
          // invece che in fondo a destra. Misurato su un campo largo 420px.
          type && CON_SELETTORE.has(type) ? "block" : "flex",
          // Un campo in errore (aria-invalid) è rosso da solo, bordo e anello di
          // focus: le app non devono ricordarsi di aggiungere classi (issue #88).
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:outline-destructive",
          // bg-card (bianco), non bg-background: un campo form è una superficie
          // sopra la pagina, deve distinguersi da ciò che lo circonda — non
          // fondersi quando il contenitore intorno usa già --background.
          "h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
