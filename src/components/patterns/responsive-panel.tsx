import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
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
  dismissOnOutsideClick = true,
  showCloseButton = false,
  dialogClassName,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Disattiva la chiusura con un clic esterno su computer, per esempio nei moduli. */
  dismissOnOutsideClick?: boolean;
  /** Mostra sul telefono la X di chiusura già presente nella finestra su computer. */
  showCloseButton?: boolean;
  /** Classi della finestra su computer, per contenuti che richiedono più spazio. */
  dialogClassName?: string;
}) {
  const largo = useWideScreen();

  if (largo) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        <DialogContent dismissOnOutsideClick={dismissOnOutsideClick} className={cn("max-w-md", dialogClassName)} {...(!description && { "aria-describedby": undefined })}>
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
      <DrawerContent className="max-h-[90dvh]" {...(!description && { "aria-describedby": undefined })}>
        {showCloseButton && (
          <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-7 z-10" aria-label="Chiudi" onClick={onClose}>
            <X aria-hidden="true" size={16} />
          </Button>
        )}
        <div className="mx-auto min-h-0 w-full max-w-md overflow-y-auto px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <DrawerHeader className={cn("px-0 text-left", showCloseButton && "pr-12")}>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
