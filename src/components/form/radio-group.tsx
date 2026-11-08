import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * Scelta a schede (issue #117, da `SceltaRadio` di ft40): una scheda per
 * opzione, con un titolo e, se serve, una descrizione. Tutta la scheda è il
 * bersaglio, alta almeno 56 px.
 *
 * **Tastiera**: ogni scheda si raggiunge con Tab e si sceglie con Invio o
 * Spazio, come ogni altra scelta delle app (ft40#191). Per questo non usa le
 * frecce del `radiogroup` classico: chi non le conosce non arriverebbe alle
 * altre voci.
 *
 * La scheda scelta ha il bordo `--selected-border` (almeno 3:1), il fondo
 * tinto e il pallino pieno: si riconosce anche senza vedere i colori.
 */
type Contesto = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  invalid: boolean;
};

const RadioGroupContext = React.createContext<Contesto | null>(null);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, disabled = false, ...props }, ref) => {
    const [interno, setInterno] = React.useState(defaultValue);
    const scelto = value !== undefined ? value : interno;
    const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    const cambia = (nuovo: string) => {
      if (value === undefined) setInterno(nuovo);
      onValueChange?.(nuovo);
    };
    return (
      <RadioGroupContext.Provider value={{ value: scelto, onValueChange: cambia, disabled, invalid }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-disabled={disabled || undefined}
          className={cn("grid gap-2", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "title"> {
  value: string;
  /** Il testo principale della scheda. In alternativa, `children`. */
  title?: React.ReactNode;
  /** Una riga più piccola sotto il titolo. */
  description?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, title, description, disabled, children, onClick, ...props }, ref) => {
    const gruppo = React.useContext(RadioGroupContext);
    if (!gruppo) throw new Error("RadioGroupItem va dentro RadioGroup");
    const scelto = gruppo.value === value;
    const spento = disabled || gruppo.disabled;
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={scelto}
        disabled={spento}
        data-state={scelto ? "checked" : "unchecked"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) gruppo.onValueChange(value);
        }}
        className={cn(
          "flex min-h-14 w-full items-center gap-3 border border-border bg-card px-3 py-2 text-left text-sm text-foreground transition-colors",
          // Al passaggio del mouse una tinta del tema, non il grigio: sul
          // grigio le etichette neutre dentro la scheda sparirebbero.
          "hover:bg-[color-mix(in_oklab,var(--primary)_6%,var(--card))] disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-selected-border data-[state=checked]:bg-[color-mix(in_oklab,var(--primary)_10%,var(--card))]",
          gruppo.invalid && "border-destructive",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          data-slot="radio"
          className={cn(
            "flex size-5 shrink-0 items-center justify-center border-2 border-input bg-card",
            scelto && "border-selected-border",
          )}
        >
          {scelto && <span data-slot="radio" className="size-2.5 bg-selected-border" />}
        </span>
        <span className="min-w-0 flex-1">
          {title !== undefined && <span className="block font-semibold">{title}</span>}
          {description !== undefined && <span className="block text-muted-foreground">{description}</span>}
          {children}
        </span>
      </button>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
