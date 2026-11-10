import * as React from "react";
import { CloudOff, RotateCw } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icona lucide (o altro) sopra il titolo. Decorativa. Nella versione errore di default è una nuvola sbarrata. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Il testo sotto il titolo: cosa ci sarà qui, o cosa è successo. */
  description?: React.ReactNode;
  /** Il pulsante per cominciare ("Aggiungi un dipendente"). */
  action?: React.ReactNode;
  /**
   * `error`: un caricamento non riuscito. L'icona prende il colore negativo,
   * il blocco viene annunciato (`role="alert"`) e, con `onRetry`, compare
   * "Riprova".
   */
  variant?: "default" | "error";
  /** Cosa fare con "Riprova". Nella versione `default` si ignora. */
  onRetry?: () => void;
  /** Il testo del pulsante per riprovare. Default "Riprova". */
  retryLabel?: string;
  /** "Riprova" spento e con la rotella mentre si riprova. */
  retrying?: boolean;
  /**
   * Occupa l'altezza disponibile, con il contenuto al centro: dentro un
   * contenitore flex in colonna cresce fino a riempirlo. Per un'altezza
   * precisa, passa anche una `min-h-*` in `className`.
   */
  fill?: boolean;
  /** Il livello del titolo. Default `h2`: di solito sta sotto l'`h1` della pagina. */
  headingLevel?: "h2" | "h3";
}

/**
 * Stato vuoto, o di errore, dentro una pagina (issue #124, da `PaginaVuota` di
 * ft40). Dice cosa ci sarà qui e, se serve, cosa fare; se il caricamento non
 * è riuscito, lo dice e offre "Riprova", perché nell'app installata sul
 * telefono non c'è il tasto per ricaricare la pagina.
 *
 * Per un crollo di tutta l'app c'è `ErrorPage`.
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      variant = "default",
      onRetry,
      retryLabel = "Riprova",
      retrying = false,
      fill = false,
      headingLevel = "h2",
      className,
      ...props
    },
    ref,
  ) => {
    const errore = variant === "error";
    const Titolo = headingLevel;
    const icona = icon ?? (errore ? <CloudOff /> : null);
    const riprova = errore && onRetry;
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-variant={variant}
        role={errore ? "alert" : undefined}
        className={cn(
          "border border-border bg-card px-5 py-10 text-center",
          fill && "flex flex-1 flex-col items-center justify-center",
          className,
        )}
        {...props}
      >
        {icona && (
          <span
            aria-hidden="true"
            className={cn(
              "mx-auto flex w-fit justify-center [&_svg]:size-8",
              errore ? "text-negative" : "text-muted-foreground",
            )}
          >
            {icona}
          </span>
        )}
        <Titolo className={cn("text-base font-semibold text-foreground", icona && "mt-4")}>{title}</Titolo>
        {description && <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
        {(action || riprova) && (
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
            {riprova && (
              <Button variant="outline" onClick={onRetry} disabled={retrying} aria-busy={retrying || undefined}>
                <RotateCw className={cn(retrying && "animate-spin motion-reduce:animate-none")} aria-hidden="true" />
                {retryLabel}
              </Button>
            )}
            {action}
          </div>
        )}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
