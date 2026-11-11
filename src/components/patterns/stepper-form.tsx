import { useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface StepperFormStep {
  contenuto: ReactNode;
  pronto: boolean;
  motivo: string | null;
}

export interface StepperFormProps {
  passi: readonly StepperFormStep[];
  passo: number;
  setPasso: (n: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onAvanti?: () => void;
  /** Collegamento dell'app per annullare dal primo passo. */
  annulla: ReactElement;
  testoInvio: string;
  invioDisabilitato: boolean;
  intestazione?: ReactNode;
  primaDelPasso?: (qui: number) => ReactNode;
  errore?: ReactNode;
  footerProps?: React.ComponentPropsWithoutRef<"div">;
  children?: ReactNode;
}

/** Modulo a passi con avanzamento e comandi fissi in fondo alla finestra. */
export function StepperForm({
  passi, passo, setPasso, onSubmit, onAvanti, annulla, testoInvio, invioDisabilitato,
  intestazione, primaDelPasso, errore, footerProps, children,
}: StepperFormProps) {
  const motivoId = useId();
  const footer = useRef<HTMLDivElement>(null);
  const [altezza, setAltezza] = useState<number>();

  const haPassi = passi.length > 0;

  useEffect(() => {
    const barra = footer.current;
    if (!haPassi || !barra) return;
    const misura = () => setAltezza(barra.offsetHeight);
    misura();
    const observer = new ResizeObserver(misura);
    observer.observe(barra);
    return () => observer.disconnect();
  }, [haPassi]);

  // Il numero dei passi può cambiare a seconda delle risposte già date.
  const qui = Math.max(0, Math.min(passo, passi.length - 1));
  const attuale = passi[qui];
  if (!attuale) return null;
  const ultimo = qui === passi.length - 1;
  const disabilitato = ultimo ? invioDisabilitato : !attuale.pronto;
  const motivo = disabilitato ? attuale.motivo : null;
  const { className, ...attributiFooter } = footerProps ?? {};

  return (
    <form
      noValidate
      className="space-y-4 pb-28"
      style={altezza === undefined ? undefined : { paddingBottom: altezza + 16 }}
      onSubmit={(evento) => {
        if (ultimo && !disabilitato) onSubmit(evento);
        else evento.preventDefault();
      }}
    >
      {intestazione}
      <div>
        <p className="text-sm text-muted-foreground">Passo {qui + 1} di {passi.length}</p>
        <div className="mt-1.5 flex gap-1" aria-hidden="true">
          {passi.map((_, indice) => (
            <span key={indice} className={cn("h-1.5 flex-1", indice <= qui ? "bg-primary-text" : "border border-muted-foreground")} />
          ))}
        </div>
      </div>
      {primaDelPasso?.(qui)}
      {attuale.contenuto}
      {errore}
      <div
        {...attributiFooter}
        ref={footer}
        className={cn("fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3", className)}
      >
        {motivo && <p id={motivoId} className="mb-2 text-sm text-foreground">{motivo}</p>}
        <div className="flex gap-2">
          {qui === 0 ? (
            <Button asChild variant="outline" className="flex-1">{annulla}</Button>
          ) : (
            <Button type="button" variant="outline" className="flex-1" onClick={() => setPasso(qui - 1)}>
              Indietro
            </Button>
          )}
          {/* Due pulsanti distinti evitano che il clic su Avanti invii il modulo. */}
          {ultimo ? (
            <Button key="invia" type="submit" className="flex-1" disabled={disabilitato} aria-describedby={motivo ? motivoId : undefined}>
              {testoInvio}
            </Button>
          ) : (
            <Button key="avanti" type="button" className="flex-1" disabled={disabilitato} aria-describedby={motivo ? motivoId : undefined}
              onClick={() => {
                onAvanti?.();
                setPasso(qui + 1);
              }}
            >
              Avanti
            </Button>
          )}
        </div>
      </div>
      {children}
    </form>
  );
}
