import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * I toni condivisi con `Card`/`CardStat`: stesso vocabolario in tutto il DS.
 * `neutral` è il default e non tinge niente — è l'etichetta che non vuole
 * dire "bene" o "male", solo "questo stato".
 */
export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "destructive";

const TONE_COLOR: Record<Exclude<BadgeTone, "neutral">, string> = {
  primary: "var(--primary-text)",
  success: "var(--positive)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Testo più piccolo, per le griglie dense. */
  size?: "sm" | "md";
}

/**
 * Etichetta di stato: una parola o due, dentro un chip.
 *
 * Nasce da gt40#129, dove uno stato ("Da inserire", "Da controllare in banca")
 * era scritto come testo attenuato in corsivo e si perdeva dentro una griglia
 * di importi. Un chip lo stacca dal resto senza gridare.
 *
 * ## Perché il testo non prende il colore del tono
 *
 * Il tono tinge **sfondo e bordo**, il testo resta su `--foreground`. Un chip
 * piccolo con testo colorato su sfondo tinto è proprio il punto in cui il
 * contrasto scende sotto 4.5:1 senza che si veda a occhio, e i toni del DS
 * (`--warning` in particolare) non sono pensati per reggere testo piccolo.
 * Così il contrasto è quello di foreground su background, che è già validato.
 *
 * Il colore quindi **rinforza**, non porta l'informazione: la parola dentro il
 * chip resta leggibile in scala di grigi e in stampa (WCAG 1.4.1).
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = "neutral", size = "md", style, ...props }, ref) => {
    const color = tone === "neutral" ? undefined : TONE_COLOR[tone];
    const toneStyle: React.CSSProperties = color
      ? {
          backgroundColor: `color-mix(in oklab, ${color} 12%, var(--card))`,
          borderColor: `color-mix(in oklab, ${color} 45%, var(--card))`,
        }
      : {};
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border font-medium text-foreground",
          tone === "neutral" && "border-border bg-muted",
          size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs",
          className,
        )}
        style={{ ...toneStyle, ...style }}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
