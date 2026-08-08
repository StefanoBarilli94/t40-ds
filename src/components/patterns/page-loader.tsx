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
  /**
   * Per un genitore con sfondo scuro/fotografico (una hero image, non
   * `bg-background`): i token neutri (`text-muted-foreground`, la barra sul
   * colore primario) sono tarati per una superficie chiara e possono cadere
   * sotto soglia AA — misurato, non presunto: contro una foto scura reale il
   * testo era a 1.6:1, la barra rossa a ~1.8:1, entrambi ben sotto le
   * rispettive soglie (4.5:1 testo, 3:1 componenti non testuali). Con
   * `inverted`, testo e barra passano al bianco, il massimo di luminanza
   * possibile: qualunque sia la foto sotto, il contrasto non può che
   * migliorare rispetto a un colore più scuro.
   */
  inverted?: boolean;
}

/**
 * Schermata di caricamento a pagina intera: logo, barra di progresso
 * indeterminata (durata sconosciuta — vedi Progress/Indeterminato) e
 * messaggio, centrati sia in verticale che in orizzontale.
 *
 * Riempie il genitore (`absolute inset-0` se il genitore è `position:
 * relative`, altrimenti l'intero viewport) — non è un overlay: sostituisce il
 * contenuto della pagina, non ci si sovrappone. Sfondo trasparente di
 * default: chi lo usa su una superficie propria (es. `inverted`) passa
 * `className="bg-transparent"` per lasciarla visibile sotto.
 */
const PageLoader = React.forwardRef<HTMLDivElement, PageLoaderProps>(
  ({ logo, message = "Caricamento in corso…", inverted = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background px-4",
        className,
      )}
      {...props}
    >
      {logo && <div className="flex items-center justify-center">{logo}</div>}
      <Progress
        aria-label={message}
        className={cn("w-full max-w-64", inverted && "bg-white/20")}
        indicatorClassName={inverted ? "bg-white" : undefined}
      />
      {/* Testo visivo che rispecchia l'aria-label sopra: niente role="status"
          qui, altrimenti lo screen reader annuncia lo stesso messaggio due
          volte (una dal progressbar, una dalla live region). */}
      <p
        className={cn("text-sm", inverted ? "text-white/90" : "text-muted-foreground")}
        aria-hidden="true"
      >
        {message}
      </p>
    </div>
  ),
);
PageLoader.displayName = "PageLoader";

export { PageLoader };
