import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * La voce attiva ha il fondo **tinto** del colore del tema, il testo scuro in
 * grassetto e, nella variante outline, il bordo del colore del tema (issue #83).
 *
 * Prima aveva il fondo pieno di `accent`, che nel tema di default è lo stesso
 * teal dei pulsanti principali: accanto a un `Button` una scelta sembrava
 * un'azione, e si perdeva la gerarchia. Una scelta fatta è uno stato, non un
 * invito a toccare: si vede, ma non urla.
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[color-mix(in_oklab,var(--primary)_14%,var(--background))] data-[state=on]:font-semibold data-[state=on]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        // Niente ombra: il DS non ne usa.
        outline:
          "border border-input bg-transparent data-[state=on]:border-primary aria-[invalid=true]:border-destructive! group-aria-[invalid=true]/scelta:border-destructive!",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
