import * as React from "react";

import { cn } from "../../lib/utils";
import { Progress } from "../atoms/progress";

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo dell'app che sta caricando. Il DS applica solo il tema
   * (`data-theme`) — ogni app consumer ha il proprio asset, quindi il logo
   * arriva come slot, non come prop stringa/URL.
   */
  logo?: React.ReactNode;
  /** Messaggio sotto la barra. Default: "Caricamento in corso…". */
  message?: string;
}

/**
 * Schermata di caricamento a pagina intera: logo, barra di progresso
 * indeterminata (durata sconosciuta — vedi Progress/Indeterminato) e
 * messaggio, centrati sia in verticale che in orizzontale.
 *
 * Riempie il genitore (`absolute inset-0` se il genitore è `position:
 * relative`, altrimenti l'intero viewport) — non è un overlay: sostituisce il
 * contenuto della pagina, non ci si sovrappone.
 */
const PageLoader = React.forwardRef<HTMLDivElement, PageLoaderProps>(
  ({ logo, message = "Caricamento in corso…", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background px-4",
        className,
      )}
      {...props}
    >
      {logo && <div className="flex items-center justify-center">{logo}</div>}
      <Progress aria-label={message} className="w-full max-w-64" />
      {/* Testo visivo che rispecchia l'aria-label sopra: niente role="status"
          qui, altrimenti lo screen reader annuncia lo stesso messaggio due
          volte (una dal progressbar, una dalla live region). */}
      <p className="text-sm text-muted-foreground" aria-hidden="true">
        {message}
      </p>
    </div>
  ),
);
PageLoader.displayName = "PageLoader";

export { PageLoader };
