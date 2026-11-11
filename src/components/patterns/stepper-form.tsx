import { useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface StepperFormStep {
  content: ReactNode;
  ready: boolean;
  reason: string | null;
}

export interface StepperFormProps {
  steps: readonly StepperFormStep[];
  step: number;
  onStepChange: (n: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onNext?: () => void;
  /** Collegamento dell'app per annullare dal primo passo. */
  cancel: ReactElement;
  submitLabel: string;
  submitDisabled: boolean;
  header?: ReactNode;
  beforeStep?: (qui: number) => ReactNode;
  error?: ReactNode;
  footerProps?: React.ComponentPropsWithoutRef<"div">;
  children?: ReactNode;
}

/** Modulo a passi con avanzamento e comandi fissi in fondo alla finestra. */
export function StepperForm({
  steps, step, onStepChange, onSubmit, onNext, cancel, submitLabel, submitDisabled,
  header, beforeStep, error, footerProps, children,
}: StepperFormProps) {
  const motivoId = useId();
  const footer = useRef<HTMLDivElement>(null);
  const [altezza, setAltezza] = useState<number>();

  const haPassi = steps.length > 0;

  useEffect(() => {
    const barra = footer.current;
    if (!haPassi || !barra) return;
    const misura = () => setAltezza(barra.offsetHeight);
    misura();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(misura);
    observer?.observe(barra);
    return () => observer?.disconnect();
  }, [haPassi]);

  // Il numero dei passi può cambiare a seconda delle risposte già date.
  const qui = Math.max(0, Math.min(step, steps.length - 1));
  const attuale = steps[qui];
  if (!attuale) return null;
  const ultimo = qui === steps.length - 1;
  const disabilitato = ultimo ? submitDisabled : !attuale.ready;
  const motivo = disabilitato ? attuale.reason : null;
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
      {header}
      <div>
        <p className="text-sm text-muted-foreground">Passo {qui + 1} di {steps.length}</p>
        <div className="mt-1.5 flex gap-1" aria-hidden="true">
          {steps.map((_, indice) => (
            <span key={indice} className={cn("h-1.5 flex-1", indice <= qui ? "bg-primary-text" : "border border-muted-foreground")} />
          ))}
        </div>
      </div>
      {beforeStep?.(qui)}
      {attuale.content}
      {error}
      <div
        {...attributiFooter}
        ref={footer}
        className={cn("fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3", className)}
      >
        {motivo && <p id={motivoId} className="mb-2 text-sm text-foreground">{motivo}</p>}
        <div className="flex gap-2">
          {qui === 0 ? (
            <Button asChild variant="outline" className="flex-1">{cancel}</Button>
          ) : (
            <Button type="button" variant="outline" className="flex-1" onClick={() => onStepChange(qui - 1)}>
              Indietro
            </Button>
          )}
          {/* Due pulsanti distinti evitano che il clic su Avanti invii il modulo. */}
          {ultimo ? (
            <Button key="invia" type="submit" className="flex-1" disabled={disabilitato} aria-describedby={motivo ? motivoId : undefined}>
              {submitLabel}
            </Button>
          ) : (
            <Button key="avanti" type="button" className="flex-1" disabled={disabilitato} aria-describedby={motivo ? motivoId : undefined}
              onClick={() => {
                onNext?.();
                onStepChange(qui + 1);
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
