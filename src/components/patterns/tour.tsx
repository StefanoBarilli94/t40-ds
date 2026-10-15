import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface TourStep {
  /**
   * L'elemento di cui parla il passo, come selettore CSS
   * (`[data-tour="richieste"]`). Senza, o se l'elemento non c'è, il riquadro
   * sta al centro: va bene per il primo passo, il benvenuto.
   */
  target?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Un'icona lucide accanto al titolo, se aiuta a capire. Decorativa. */
  icon?: React.ReactNode;
}

export interface TourLabels {
  next: string;
  back: string;
  skip: string;
  done: string;
  /** "Passo 2 di 4" */
  step: (n: number, total: number) => string;
}

const ETICHETTE: TourLabels = {
  next: "Avanti",
  back: "Indietro",
  skip: "Salta",
  done: "Ho capito",
  step: (n, total) => `Passo ${n} di ${total}`,
};

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  /** `completed`: si è arrivati in fondo; `false` se si è saltato. In entrambi i casi il tour non va riproposto. */
  onClose: (completed: boolean) => void;
  labels?: Partial<TourLabels>;
}

type Riquadro = { top: number; left: number; width: number; height: number };

const MARGINE = 8; // spazio fra l'elemento e la luce intorno
const DISTANZA = 12; // spazio fra la luce e il riquadro del passo
const BORDO = 16; // distanza minima dai bordi dello schermo
const LARGHEZZA = 352; // 22rem

/**
 * Una guida a passi sopra l'interfaccia (issue #100, nata da ft40#100): un
 * riquadro per passo, con titolo e testo brevi, e Avanti, Indietro, Salta.
 * L'elemento di cui si parla resta in luce, il resto si scurisce con un velo
 * (non un'ombra: le ombre il DS non le usa).
 *
 * - Su computer il riquadro sta sotto l'elemento, o sopra se sotto non c'è
 *   posto; su telefono (sotto i 640px) si appoggia in basso, sotto il pollice,
 *   o in alto se l'elemento di cui si parla sta nella metà bassa dello schermo.
 * - Tastiera: il focus entra nel riquadro, Esc salta, frecce destra e
 *   sinistra cambiano passo. È un `dialog` modale, con il titolo del passo
 *   come nome.
 * - Con il movimento ridotto l'elemento si porta in vista senza scorrere
 *   animato.
 *
 * Quando mostrarlo e ricordarsi che è stato visto lo decide l'app.
 */
function Tour({ steps, open, onClose, labels }: TourProps) {
  const t = { ...ETICHETTE, ...labels };
  const [indice, setIndice] = React.useState(0);
  const [luce, setLuce] = React.useState<Riquadro | null>(null);
  const [schermo, setSchermo] = React.useState({ w: 0, h: 0 });
  const [altezza, setAltezza] = React.useState(0);
  const riquadro = React.useRef<HTMLDivElement>(null);
  const idTitolo = React.useId();
  const idTesto = React.useId();

  const passo = steps[Math.min(indice, steps.length - 1)];
  const ultimo = indice >= steps.length - 1;

  // Riaperto, si riparte dal primo passo.
  React.useEffect(() => {
    if (open) setIndice(0);
  }, [open]);

  // Dove sta l'elemento del passo: lo si porta in vista e lo si misura, anche
  // quando lo schermo cambia o si scorre.
  React.useEffect(() => {
    if (!open || !passo) return;
    const elemento = passo.target ? document.querySelector<HTMLElement>(passo.target) : null;
    const ridotto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    elemento?.scrollIntoView({ block: "center", behavior: ridotto ? "auto" : "smooth" });
    const misura = () => {
      setSchermo({ w: window.innerWidth, h: window.innerHeight });
      if (!elemento) return setLuce(null);
      const r = elemento.getBoundingClientRect();
      setLuce({ top: r.top - MARGINE, left: r.left - MARGINE, width: r.width + MARGINE * 2, height: r.height + MARGINE * 2 });
    };
    misura();
    // Lo scorrimento morbido dura un attimo: si rimisura alla fine.
    const dopo = window.setTimeout(misura, 350);
    window.addEventListener("resize", misura);
    window.addEventListener("scroll", misura, true);
    return () => {
      window.clearTimeout(dopo);
      window.removeEventListener("resize", misura);
      window.removeEventListener("scroll", misura, true);
    };
  }, [open, passo]);

  // Il focus nel riquadro a ogni passo: chi usa la tastiera o lo screen reader
  // sente il passo nuovo.
  React.useLayoutEffect(() => {
    if (!open) return;
    riquadro.current?.focus();
    setAltezza(riquadro.current?.offsetHeight ?? 0);
  }, [open, indice]);

  if (!open || !passo || typeof document === "undefined") return null;

  const avanti = () => (ultimo ? onClose(true) : setIndice((i) => i + 1));
  const indietro = () => setIndice((i) => Math.max(0, i - 1));
  const tasti = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose(false);
    } else if (e.key === "ArrowRight") avanti();
    else if (e.key === "ArrowLeft") indietro();
  };

  const telefono = schermo.w > 0 && schermo.w < 640;
  // Su telefono il riquadro sta in basso, sotto il pollice; ma se l'elemento è
  // nella metà bassa (la barra di navigazione) va in alto, per non coprirlo.
  const telefonoInAlto = telefono && !!luce && luce.top > schermo.h / 2;
  // Su computer: sotto l'elemento se c'è posto, se no sopra; mai fuori schermo.
  let posizione: React.CSSProperties | undefined;
  if (!telefono && luce) {
    const sotto = luce.top + luce.height + DISTANZA;
    const top = sotto + altezza <= schermo.h - BORDO ? sotto : Math.max(BORDO, luce.top - DISTANZA - altezza);
    const left = Math.min(Math.max(BORDO, luce.left), schermo.w - LARGHEZZA - BORDO);
    posizione = { top, left, width: LARGHEZZA };
  }

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      {/* Il velo, con un buco dove sta l'elemento. Un clic sul velo non fa
          niente: si esce con Salta o con Esc. */}
      <svg aria-hidden="true" className="absolute inset-0 size-full">
        <defs>
          <mask id={`${idTitolo}-buco`}>
            <rect width="100%" height="100%" fill="white" />
            {luce && <rect x={luce.left} y={luce.top} width={luce.width} height={luce.height} fill="black" />}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          mask={`url(#${idTitolo}-buco)`}
          style={{ fill: "color-mix(in oklab, var(--foreground) 62%, transparent)" }}
        />
      </svg>
      {luce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute outline outline-2 outline-primary"
          style={{ top: luce.top, left: luce.left, width: luce.width, height: luce.height }}
        />
      )}

      <div
        ref={riquadro}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitolo}
        aria-describedby={idTesto}
        tabIndex={-1}
        onKeyDown={tasti}
        className={cn(
          "absolute border border-border bg-card p-4 text-card-foreground focus-visible:outline-none",
          telefono
            ? telefonoInAlto
              ? "inset-x-3 top-[calc(0.75rem+env(safe-area-inset-top))]"
              : "inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))]"
            : !luce && "left-1/2 top-1/2 w-[22rem] -translate-x-1/2 -translate-y-1/2",
        )}
        style={posizione}
      >
        <p className="text-xs font-medium tabular-nums text-muted-foreground">{t.step(indice + 1, steps.length)}</p>
        <h2 id={idTitolo} className="mt-1 flex items-center gap-2 text-base font-semibold text-foreground">
          {passo.icon && (
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center bg-muted [&_svg]:size-4">
              {passo.icon}
            </span>
          )}
          {passo.title}
        </h2>
        <p id={idTesto} className="mt-2 text-sm text-foreground">
          {passo.description}
        </p>
        {/* Quanti passi mancano, a colpo d'occhio. */}
        <div aria-hidden="true" className="mt-4 flex gap-1">
          {steps.map((_, i) => (
            <span key={i} className={cn("h-1 flex-1", i <= indice ? "bg-primary" : "bg-border")} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button variant="ghost" className="h-11 px-2 sm:h-9" onClick={() => onClose(false)}>
            {t.skip}
          </Button>
          <div className="flex gap-2">
            {indice > 0 && (
              <Button variant="outline" className="h-11 sm:h-9" onClick={indietro}>
                {t.back}
              </Button>
            )}
            <Button className="h-11 sm:h-9" onClick={avanti}>
              {ultimo ? t.done : t.next}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
Tour.displayName = "Tour";

export { Tour };
