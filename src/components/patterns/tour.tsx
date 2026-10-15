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
  /**
   * A ogni passo, prima di cercare l'elemento: l'app può aprire la pagina di
   * cui parla il passo. L'elemento lo si aspetta fino a 3 secondi, il tempo
   * che la pagina nuova compaia.
   */
  onStepChange?: (index: number) => void;
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
 * - Un passo può parlare di un'altra pagina: con `onStepChange` l'app la apre,
 *   e il Tour aspetta che l'elemento compaia.
 *
 * Quando mostrarlo e ricordarsi che è stato visto lo decide l'app.
 */
function Tour({ steps, open, onClose, onStepChange, labels }: TourProps) {
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
  // In un ref: chi usa il Tour la passa di solito come funzione nuova a ogni render.
  const cambioPasso = React.useRef(onStepChange);
  cambioPasso.current = onStepChange;

  // Riaperto, si riparte dal primo passo.
  React.useEffect(() => {
    if (open) setIndice(0);
  }, [open]);

  // Dove sta l'elemento del passo: lo si porta in vista e lo si misura, anche
  // quando lo schermo cambia o si scorre. Se non c'è ancora (l'app ha appena
  // aperto un'altra pagina) lo si cerca ogni 100ms, per 3 secondi al massimo:
  // intanto il riquadro sta al centro.
  React.useEffect(() => {
    if (!open || !passo) return;
    cambioPasso.current?.(indice);
    let elemento: HTMLElement | null = null;
    const ridotto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const misura = () => {
      setSchermo({ w: window.innerWidth, h: window.innerHeight });
      if (!elemento || !elemento.isConnected) return setLuce(null);
      const r = elemento.getBoundingClientRect();
      setLuce({ top: r.top - MARGINE, left: r.left - MARGINE, width: r.width + MARGINE * 2, height: r.height + MARGINE * 2 });
    };
    const timer: number[] = [];
    const trova = () => {
      elemento = passo.target ? document.querySelector<HTMLElement>(passo.target) : null;
      if (!elemento) return false;
      elemento.scrollIntoView({ block: "center", behavior: ridotto ? "auto" : "smooth" });
      misura();
      // Lo scorrimento morbido dura un attimo: si rimisura alla fine.
      timer.push(window.setTimeout(misura, 350));
      return true;
    };
    setLuce(null);
    misura();
    let tentativi = 0;
    const cerca = passo.target && !trova() ? window.setInterval(() => {
      tentativi += 1;
      if (trova() || tentativi >= 30) window.clearInterval(cerca);
    }, 100) : undefined;
    window.addEventListener("resize", misura);
    window.addEventListener("scroll", misura, true);
    return () => {
      timer.forEach((t) => window.clearTimeout(t));
      if (cerca) window.clearInterval(cerca);
      window.removeEventListener("resize", misura);
      window.removeEventListener("scroll", misura, true);
    };
  }, [open, passo, indice]);

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
          // Sul velo l'elemento in luce ha un bordo più spesso nel colore del tema
          // della navigazione: lo stesso del riquadro, così occhio va da uno all'altro.
          className="pointer-events-none absolute outline outline-[3px] outline-sidebar-primary"
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
        // Scuro come la navigazione delle app Tabaccheria 4.0 (sidebar): sopra
        // un'interfaccia chiara il riquadro si stacca, e si capisce subito che
        // è la guida e non un pezzo della pagina (issue #105). `data-sidebar`
        // gli dà l'anello di focus del DS per le superfici scure.
        data-sidebar="tour"
        className={cn(
          "absolute border border-sidebar-border bg-sidebar p-4 text-sidebar-foreground focus-visible:outline-none",
          telefono
            ? telefonoInAlto
              ? "inset-x-3 top-[calc(0.75rem+env(safe-area-inset-top))]"
              : "inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))]"
            : !luce && "left-1/2 top-1/2 w-[22rem] -translate-x-1/2 -translate-y-1/2",
        )}
        style={posizione}
      >
        <p className="text-xs font-medium tabular-nums text-sidebar-foreground/70">{t.step(indice + 1, steps.length)}</p>
        <h2 id={idTitolo} className="mt-1 flex items-center gap-2 text-base font-semibold text-sidebar-foreground">
          {passo.icon && (
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center bg-sidebar-accent text-sidebar-primary [&_svg]:size-4"
            >
              {passo.icon}
            </span>
          )}
          {passo.title}
        </h2>
        <p id={idTesto} className="mt-2 text-sm text-sidebar-foreground">
          {passo.description}
        </p>
        {/* Quanti passi mancano, a colpo d'occhio. */}
        <div aria-hidden="true" className="mt-4 flex gap-1">
          {steps.map((_, i) => (
            <span key={i} className={cn("h-1 flex-1", i <= indice ? "bg-sidebar-primary" : "bg-sidebar-border")} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            className="h-11 px-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground sm:h-9"
            onClick={() => onClose(false)}
          >
            {t.skip}
          </Button>
          <div className="flex gap-2">
            {indice > 0 && (
              <Button
                variant="outline"
                className="h-11 border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground sm:h-9"
                onClick={indietro}
              >
                {t.back}
              </Button>
            )}
            <Button
              className="h-11 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 sm:h-9"
              onClick={avanti}
            >
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
