// Barrel export — Tabaccheria 4.0 design system.
// Consumed as source (no build step): ast40/gt40 compile this via their own
// Vite/TypeScript setup, so make sure their tsconfig `paths` and Tailwind
// `@source` scanning include this package's `src/components/{atoms,form,patterns}`.
// See README.
//
// Ogni componente qui dentro e' usato da almeno una delle due app, oppure e'
// dipendenza interna di uno che lo e' (issue #27). Non aggiungere componenti
// "per completezza": il DS e' distribuito come sorgente, ogni modulo in piu'
// porta con se' le proprie dipendenze npm nei consumer.

export * from "./components/patterns/accordion";
export * from "./components/patterns/alert";
export * from "./components/patterns/alert-dialog";
export * from "./components/atoms/badge";
export * from "./components/atoms/button";
export * from "./components/form/calendar";
export * from "./components/patterns/card";
export * from "./components/form/currency-input";
export * from "./components/patterns/dialog";
export * from "./components/patterns/drawer";
export * from "./components/patterns/dropdown-menu";
export * from "./components/patterns/hover-card";
export * from "./components/form/input";
export * from "./components/form/label";
export * from "./components/patterns/page-loader";
export * from "./components/patterns/popover";
export * from "./components/atoms/progress";
export * from "./components/patterns/scroll-area";
export * from "./components/form/select";
export * from "./components/atoms/separator";
export * from "./components/patterns/sheet";
export * from "./components/patterns/sidebar";
export * from "./components/atoms/skeleton";
export * from "./components/patterns/sonner";
export * from "./components/form/switch";
export * from "./components/patterns/table";
export * from "./components/patterns/tabs";
export * from "./components/form/textarea";
export * from "./components/form/toggle";
export * from "./components/atoms/tooltip";

export { cn } from "./lib/utils";
export { useIsMobile } from "./hooks/use-mobile";

// I design token (colori, radius) sono in ./index.css — non un modulo JS.
// L'app consumer li importa direttamente, es. in main.tsx:
//   import "@tabaccheria/design-system/src/index.css";
