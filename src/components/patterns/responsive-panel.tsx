import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import { useWideScreen } from "../../hooks/use-wide-screen";

/**
 * Un pannello per scegliere o fare una cosa al volo. Su telefono sale dal
 * basso, a portata di pollice; su computer è una finestra classica al centro:
 * un foglio dal basso largo quanto lo schermo, lì, è scomodo da leggere.
 *
 * Il contenuto è lo stesso nei due casi, e il pulsante per chiudere lo mette
 * chi lo usa: un'uscita che si legge serve in entrambi.
 */
export function ResponsivePanel({
  aperto,
  onChiudi,
  titolo,
  descrizione,
  children,
}: {
  aperto: boolean;
  onChiudi: () => void;
  titolo: ReactNode;
  descrizione?: ReactNode;
  children: ReactNode;
}) {
  const largo = useWideScreen();

  if (largo) {
    return (
      <Dialog open={aperto} onOpenChange={(o) => !o && onChiudi()}>
        {/* Si sceglie e basta: niente da perdere, toccare fuori può chiudere. */}
        <DialogContent dismissOnOutsideClick className="max-w-md" {...(!descrizione && { "aria-describedby": undefined })}>
          <DialogHeader>
            <DialogTitle>{titolo}</DialogTitle>
            {descrizione && <DialogDescription>{descrizione}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={aperto} onOpenChange={(o) => !o && onChiudi()}>
      <DrawerContent {...(!descrizione && { "aria-describedby": undefined })}>
        <div className="mx-auto w-full max-w-md px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle>{titolo}</DrawerTitle>
            {descrizione && <DrawerDescription>{descrizione}</DrawerDescription>}
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
