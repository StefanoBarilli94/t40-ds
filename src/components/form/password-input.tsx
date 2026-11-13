import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Input } from "./input";

export interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  /** Nome del pulsante quando la password è nascosta. */
  labelMostra?: string;
  /** Nome del pulsante quando la password si vede. */
  labelNascondi?: string;
}

/**
 * Campo password con l'occhio per vederla mentre si scrive (issue #144, ft40#368).
 *
 * Parte nascosta. Il pulsante sta dentro il campo, a destra: è `type="button"`,
 * quindi non invia il modulo, si raggiunge con Tab e si usa con Invio o Spazio.
 * Cambia solo il `type` dell'input: il valore resta, e restano `autoComplete` e
 * gli altri props, così i gestori di password continuano a riconoscerlo.
 *
 * Il pulsante è alto quanto il campo (44 px su telefono, 36 da `md`): è l'area
 * di tocco minima, e non sporge dal campo.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, id, labelMostra = "Mostra password", labelNascondi = "Nascondi password", ...props }, ref) => {
    const [visibile, setVisibile] = React.useState(false);
    const Icona = visibile ? EyeOff : Eye;
    return (
      <div className="relative w-full min-w-0">
        <Input
          ref={ref}
          id={id}
          type={visibile ? "text" : "password"}
          disabled={disabled}
          // Il testo non arriva sotto l'occhio.
          className={cn("pr-11 md:pr-9", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          aria-label={visibile ? labelNascondi : labelMostra}
          aria-pressed={visibile}
          aria-controls={id}
          onClick={() => setVisibile((v) => !v)}
          className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
        >
          <Icona aria-hidden="true" />
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
