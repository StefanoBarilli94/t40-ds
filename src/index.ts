// Barrel export — Tabaccheria 4.0 design system.
// Consumed as source (no build step): ast40/gt40 compile this via their own
// Vite/TypeScript setup, so make sure their tsconfig `paths` and Tailwind
// `@source` scanning include this package's `src/components/ui`. See README.

export * from "./components/ui/accordion";
export * from "./components/ui/alert";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/aspect-ratio";
export * from "./components/ui/avatar";
export * from "./components/ui/badge";
export * from "./components/ui/breadcrumb";
export * from "./components/ui/button";
export * from "./components/ui/calendar";
export * from "./components/ui/card";
export * from "./components/ui/carousel";
export * from "./components/ui/chart";
export * from "./components/ui/checkbox";
export * from "./components/ui/collapsible";
export * from "./components/ui/command";
export * from "./components/ui/context-menu";
export * from "./components/ui/dialog";
export * from "./components/ui/drawer";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/form";
export * from "./components/ui/hover-card";
export * from "./components/ui/input";
export * from "./components/ui/input-otp";
export * from "./components/ui/label";
export * from "./components/ui/menubar";
export * from "./components/ui/navigation-menu";
export * from "./components/ui/pagination";
export * from "./components/ui/popover";
export * from "./components/ui/progress";
export * from "./components/ui/radio-group";
export * from "./components/ui/resizable";
export * from "./components/ui/responsive-dialog";
export * from "./components/ui/scroll-area";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/sidebar";
export * from "./components/ui/skeleton";
export * from "./components/ui/slider";
export * from "./components/ui/sonner";
export * from "./components/ui/switch";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/toast";
export { Toaster as LegacyToaster } from "./components/ui/toaster";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/tooltip";

export { cn } from "./lib/utils";
export { useIsMobile } from "./hooks/use-mobile";
export { useToast, toast as legacyToast } from "./hooks/use-toast";

// I design token (colori, radius) sono in ./index.css — non un modulo JS.
// L'app consumer li importa direttamente, es. in main.tsx:
//   import "@tabaccheria/design-system/src/index.css";
