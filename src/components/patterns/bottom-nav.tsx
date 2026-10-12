import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";

/**
 * Navigazione principale su telefono: una barra fissa in fondo allo schermo.
 *
 * Su telefono la `Sidebar` diventa un pannello a scomparsa, che va bene per le
 * app usate soprattutto da desktop. Un'app che si apre ogni giorno dal
 * telefono ha bisogno delle voci principali sempre a portata di pollice
 * (issue #70, nata da ft40).
 *
 * Usa i token della `Sidebar` (`--sidebar-*`): è la stessa navigazione, in
 * un'altra posizione. Per questo porta `data-sidebar`, così eredita anche
 * l'anello di focus pensato per quella superficie scura.
 *
 * Sparisce da `md` in su, la stessa soglia di `useIsMobile`: da lì la
 * navigazione è la `Sidebar`. Da 3 a 5 voci: con più di cinque il testo non ci
 * sta e il bersaglio si stringe.
 */
const BottomNav = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  ({ className, children, "aria-label": etichetta = "Navigazione principale", ...props }, ref) => (
    <nav
      ref={ref}
      data-sidebar="bottom-nav"
      aria-label={etichetta}
      className={cn(
        // pb con safe-area: su un telefono senza tasto fisico l'ultima fascia
        // dello schermo è del sistema, e una PWA installata ci arriva sotto.
        "fixed inset-x-0 bottom-0 z-40 border-t border-sidebar-border bg-sidebar pb-[env(safe-area-inset-bottom)] text-sidebar-foreground md:hidden",
        className,
      )}
      {...props}
    >
      <ul className="flex items-stretch">{children}</ul>
    </nav>
  ),
);
BottomNav.displayName = "BottomNav";

export interface BottomNavItemProps extends React.ComponentProps<"button"> {
  /** Rende il figlio (di solito il `Link` del router) al posto del `button`. */
  asChild?: boolean;
  /** La voce della pagina in cui ci si trova. */
  isActive?: boolean;
}

/**
 * Una voce della barra: icona sopra, testo sotto, sempre entrambi.
 *
 * La voce attiva non si distingue solo dal colore (WCAG 1.4.1): ha una barra
 * in alto, lo sfondo e il peso del testo, oltre a `aria-current="page"`.
 */
const BottomNavItem = React.forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ asChild = false, isActive = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <li className="flex min-w-0 flex-1">
        <Comp
          ref={ref}
          data-sidebar="bottom-nav-button"
          data-active={isActive}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            // min-h-14: 56px, sopra i 44 raccomandati per un bersaglio al tocco.
            // -outline-offset-2: l'anello di focus sta dentro la voce, perché
            // fuori verrebbe tagliato dai bordi dello schermo.
            "relative flex min-h-14 w-full min-w-0 flex-col items-center justify-center gap-1 border-t-2 border-transparent px-1 pb-1.5 pt-1 text-xs font-medium leading-none text-sidebar-foreground/80 -outline-offset-2 transition-colors",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
            "data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-sidebar-accent-foreground",
            "[&>span:not([data-sidebar])]:max-w-full [&>span:not([data-sidebar])]:truncate [&>svg]:size-5 [&>svg]:shrink-0",
            className,
          )}
          {...props}
        />
      </li>
    );
  },
);
BottomNavItem.displayName = "BottomNavItem";

export interface BottomNavBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Cosa conta il numero, per chi non lo vede: "3 avvisi non letti". Si
   * aggiunge al nome della voce, quindi va messo **dentro** `BottomNavItem`.
   */
  label: string;
}

/** Contatore su una voce, per esempio gli avvisi non letti. */
const BottomNavBadge = React.forwardRef<HTMLSpanElement, BottomNavBadgeProps>(
  ({ className, label, children, ...props }, ref) => (
    <span
      ref={ref}
      data-sidebar="bottom-nav-badge"
      className={cn(
        "pointer-events-none absolute left-1/2 top-1 ml-1.5 flex h-4 min-w-4 items-center justify-center bg-sidebar-primary px-1 text-[11px] font-semibold tabular-nums leading-none text-sidebar-primary-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
      <span className="sr-only">{label}</span>
    </span>
  ),
);
BottomNavBadge.displayName = "BottomNavBadge";

/**
 * Spazio da lasciare in fondo alla pagina, alto quanto la barra: senza,
 * l'ultimo contenuto resta nascosto sotto. Sparisce insieme alla barra.
 */
const BottomNavSpacer = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    aria-hidden="true"
    data-sidebar="bottom-nav-spacer"
    className={cn("h-[calc(3.5rem+env(safe-area-inset-bottom))] shrink-0 md:hidden", className)}
    {...props}
  />
);
BottomNavSpacer.displayName = "BottomNavSpacer";

export { BottomNav, BottomNavItem, BottomNavBadge, BottomNavSpacer };
