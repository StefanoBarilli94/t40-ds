import * as React from "react";

import { cn } from "../../lib/utils";

export interface ErrorPageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icona lucide (o altro) dentro il riquadro in alto. Decorativa. */
  icon?: React.ReactNode;
  /** Il codice, se serve a chi chiede aiuto: "404", "500". Piccolo, sopra il titolo. */
  code?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** I pulsanti per ripartire: di solito uno principale verso la pagina iniziale. */
  actions?: React.ReactNode;
  /**
   * A pagina intera (quando si è rotto il guscio dell'app): occupa tutto lo
   * schermo e il titolo è l'`h1`. Senza, sta dentro il guscio, che ha già il
   * suo `h1`: il titolo diventa un `h2`.
   */
  fullScreen?: boolean;
}

/**
 * Pagina di errore, uguale in tutte le app (issue #97, nata da ft40#99):
 * icona in un riquadro, codice facoltativo, titolo, testo e i pulsanti per
 * ripartire, centrati.
 *
 * Il testo lo sceglie l'app, che conosce le sue persone: il DS dà la forma.
 * La regola per chi scrive: dire cosa è successo senza colpe, e dare sempre
 * una strada per uscire.
 */
const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  ({ icon, code, title, description, actions, fullScreen = false, className, ...props }, ref) => {
    const Titolo = fullScreen ? "h1" : "h2";
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center px-4 text-center",
          fullScreen ? "min-h-dvh bg-background" : "py-16",
          className,
        )}
        {...props}
      >
        <div className="flex max-w-md flex-col items-center">
          {icon && (
            <div
              aria-hidden="true"
              className="mb-5 flex size-14 items-center justify-center bg-muted text-foreground [&_svg]:size-7"
            >
              {icon}
            </div>
          )}
          {code && <p className="mb-1 text-sm font-medium tabular-nums text-muted-foreground">Errore {code}</p>}
          <Titolo className="text-xl font-semibold tracking-tight text-foreground">{title}</Titolo>
          {description && <p className="mt-2 text-base text-muted-foreground">{description}</p>}
          {actions && (
            // Su telefono i pulsanti uno sotto l'altro a tutta larghezza, da sm in riga.
            <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-center">{actions}</div>
          )}
        </div>
      </div>
    );
  },
);
ErrorPage.displayName = "ErrorPage";

export { ErrorPage };
