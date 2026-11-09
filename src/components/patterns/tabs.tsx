import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

/**
 * Due stili di schede, con una regola (issue #118):
 *
 * - `segmented` (default), la pillola grigia: **viste dello stesso contenuto**
 *   o filtri ("Ferie / Malattie", "3 / 6 / 12 mesi").
 * - `underline`, la sottolineatura: **sezioni diverse di una pagina**
 *   ("Dipendenti / Orari / Festivi").
 *
 * In tutti e due l'elenco delle schede sta nella larghezza di chi lo contiene:
 * se non ci sta scorre **dentro di sé**, con una sfumatura sul lato dove c'è
 * dell'altro, e non allarga mai la pagina.
 */
type VarianteTabs = "segmented" | "underline";

const VarianteContext = React.createContext<VarianteTabs>("segmented");

const Tabs = TabsPrimitive.Root;

const SFUMATURA = "1.5rem";

/** Quali lati dell'elenco nascondono altre schede, per la sfumatura. */
function useBordiNascosti(elemento: React.RefObject<HTMLDivElement | null>) {
  const [bordi, setBordi] = React.useState({ inizio: false, fine: false });
  React.useEffect(() => {
    const el = elemento.current;
    if (!el) return;
    const misura = () => {
      const fine = el.scrollWidth - el.clientWidth - el.scrollLeft > 1;
      const inizio = el.scrollLeft > 1;
      setBordi((b) => (b.inizio === inizio && b.fine === fine ? b : { inizio, fine }));
    };
    misura();
    el.addEventListener("scroll", misura, { passive: true });
    // Nei test (jsdom) ResizeObserver non c'è: si misura solo allo scorrimento.
    const osservatore = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(misura);
    osservatore?.observe(el);
    return () => {
      el.removeEventListener("scroll", misura);
      osservatore?.disconnect();
    };
  }, [elemento]);
  return bordi;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { variant?: VarianteTabs }
>(({ className, variant = "segmented", style, ...props }, ref) => {
  const interno = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => interno.current as HTMLDivElement);
  const { inizio, fine } = useBordiNascosti(interno);
  const maschera =
    inizio || fine
      ? `linear-gradient(to right, ${inizio ? "transparent" : "black"} 0, black ${inizio ? SFUMATURA : "0px"}, black calc(100% - ${fine ? SFUMATURA : "0px"}), ${fine ? "transparent" : "black"} 100%)`
      : undefined;
  return (
    <VarianteContext.Provider value={variant}>
      <TabsPrimitive.List
        ref={interno}
        data-variant={variant}
        className={cn(
          // max-w-full + overflow: scorre dentro di sé, non allarga la pagina.
          // relative: i testi sr-only (posizione assoluta) delle schede fuori
          // vista restano dentro l'elenco invece di allargare la pagina.
          "relative flex max-w-full items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          variant === "segmented"
            ? "w-fit bg-muted p-1 text-muted-foreground"
            : "w-full gap-4 border-b border-border text-muted-foreground",
          className,
        )}
        style={{ maskImage: maschera, WebkitMaskImage: maschera, ...style }}
        {...props}
      />
    </VarianteContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(VarianteContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        // 44 px sotto md, come gli altri controlli (issue #116).
        "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-semibold data-[state=active]:text-foreground",
        variant === "segmented"
          ? "px-3 py-1 data-[state=active]:bg-background md:min-h-7"
          : // La sottolineatura copre il bordo dell'elenco (-mb-px).
            "-mb-px border-b-2 border-transparent px-1 py-2 data-[state=active]:border-selected-border md:min-h-9",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { VarianteTabs };
