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
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  const largo = useWideScreen();

  if (largo) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        {/* Si sceglie e basta: niente da perdere, toccare fuori può chiudere. */}
        <DialogContent dismissOnOutsideClick className="max-w-md" {...(!description && { "aria-describedby": undefined })}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent {...(!description && { "aria-describedby": undefined })}>
        <div className="mx-auto w-full max-w-md px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
