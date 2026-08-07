// Barrel export — Tabaccheria 4.0 design system.
// Consumed as source (no build step): ast40/gt40 compile this via their own
// Vite/TypeScript setup, so make sure their tsconfig `paths` and Tailwind
// `@source` scanning include this package's `src/components/{atoms,form,patterns}`.
// See README.

export * from "./components/patterns/accordion";
export * from "./components/patterns/alert";
export * from "./components/patterns/alert-dialog";
export * from "./components/atoms/aspect-ratio";
export * from "./components/atoms/avatar";
export * from "./components/atoms/badge";
export * from "./components/patterns/breadcrumb";
export * from "./components/atoms/button";
export * from "./components/form/calendar";
export * from "./components/patterns/card";
export * from "./components/patterns/carousel";
export * from "./components/patterns/chart";
export * from "./components/form/checkbox";
export * from "./components/patterns/collapsible";
export * from "./components/patterns/command";
export * from "./components/patterns/context-menu";
export * from "./components/patterns/data-table";
export * from "./components/patterns/dialog";
export * from "./components/patterns/drawer";
export * from "./components/patterns/dropdown-menu";
export * from "./components/form/form";
export * from "./components/patterns/hover-card";
export * from "./components/form/input";
export * from "./components/form/input-otp";
export * from "./components/form/label";
export * from "./components/patterns/menubar";
export * from "./components/patterns/navigation-menu";
export * from "./components/patterns/pagination";
export * from "./components/patterns/popover";
export * from "./components/atoms/progress";
export * from "./components/form/radio-group";
export * from "./components/patterns/resizable";
export * from "./components/patterns/responsive-dialog";
export * from "./components/patterns/scroll-area";
export * from "./components/form/select";
export * from "./components/atoms/separator";
export * from "./components/patterns/sheet";
export * from "./components/patterns/sidebar";
export * from "./components/atoms/skeleton";
export * from "./components/form/slider";
export * from "./components/patterns/sonner";
export * from "./components/form/switch";
export * from "./components/patterns/table";
export * from "./components/patterns/tabs";
export * from "./components/form/textarea";
export * from "./components/patterns/toast";
export { Toaster as LegacyToaster } from "./components/patterns/toaster";
export * from "./components/form/toggle";
export * from "./components/form/toggle-group";
export * from "./components/atoms/tooltip";

export { cn } from "./lib/utils";
export { useIsMobile } from "./hooks/use-mobile";
export { useToast, toast as legacyToast } from "./hooks/use-toast";

// I design token (colori, radius) sono in ./index.css — non un modulo JS.
// L'app consumer li importa direttamente, es. in main.tsx:
//   import "@tabaccheria/design-system/src/index.css";
