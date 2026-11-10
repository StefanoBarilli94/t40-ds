import * as React from "react";
import { CircleAlert, CircleCheck, Info, Lightbulb, TriangleAlert } from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * I toni di un avviso dentro la pagina (issue #121):
 *
 * - `neutral`: un'informazione, senza urgenza;
 * - `primary`: l'evidenza, "quello che conta qui" (un riepilogo, "In breve");
 * - `success`: una cosa andata a buon fine;
 * - `warning`: una cosa da sapere prima di andare avanti;
 * - `destructive`: un errore.
 */
export type CalloutTone = "neutral" | "primary" | "success" | "warning" | "destructive";

const TONI: Record<CalloutTone, { box: string; icona: string; Icona: React.ElementType }> = {
  neutral: { box: "border-border bg-muted", icona: "text-muted-foreground", Icona: Info },
  primary: { box: "border-primary-border bg-primary-subtle", icona: "text-primary-text", Icona: Lightbulb },
  success: { box: "border-positive-border bg-positive-subtle", icona: "text-positive", Icona: CircleCheck },
  warning: { box: "border-warning-border bg-warning-subtle", icona: "text-warning", Icona: TriangleAlert },
  destructive: { box: "border-negative-border bg-negative-subtle", icona: "text-negative", Icona: CircleAlert },
};

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: CalloutTone;
  /** Una riga in grassetto sopra il testo. Facoltativa: spesso basta il testo. */
  title?: React.ReactNode;
  /**
   * L'icona a sinistra. Di default quella del tono; un'altra icona lucide per
   * cambiarla, `null` per toglierla.
   */
  icon?: React.ReactNode | null;
  /** Pulsanti o collegamenti sotto il testo. */
  action?: React.ReactNode;
}

/**
 * Avviso dentro la pagina (issue #121): un blocco con fondo tenue, un bordo
 * sottile e l'icona del tono. **Niente barra laterale spessa**: la barra
 * laterale è per gli stati di una scheda (Card `accent`, 2 px), non per gli
 * avvisi.
 *
 * Il testo resta `--foreground`: il colore sta sull'icona, che con la parola
 * dice il tono. Non annuncia niente da solo; se l'avviso compare dopo
 * un'azione e va letto subito, dagli `role="status"` (o `role="alert"` per un
 * errore). Per un errore che blocca un modulo c'è anche `Alert`.
 */
const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ tone = "neutral", title, icon, action, className, children, ...props }, ref) => {
    const t = TONI[tone];
    const Icona = t.Icona;
    const mostraIcona = icon !== null;
    return (
      <div
        ref={ref}
        data-slot="callout"
        data-tone={tone}
        className={cn("flex gap-3 border px-4 py-3 text-sm text-foreground", t.box, className)}
        {...props}
      >
        {mostraIcona && (
          <span aria-hidden="true" className={cn("mt-0.5 shrink-0 [&_svg]:size-4", t.icona)}>
            {icon ?? <Icona />}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {title && <p className="font-semibold">{title}</p>}
          {children && <div className={cn("leading-relaxed", title && "mt-0.5")}>{children}</div>}
          {action && <div className="mt-3 flex flex-wrap gap-2">{action}</div>}
        </div>
      </div>
    );
  },
);
Callout.displayName = "Callout";

export { Callout };
