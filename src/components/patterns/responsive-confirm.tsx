import type { ReactNode } from "react";
import { Button } from "../atoms/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import { useWideScreen } from "../../hooks/use-wide-screen";

/**
 * La finestra che chiede conferma prima di un'azione che conta: pubblicare,
 * annullare, rifiutare, togliere. È la stessa in tutta l'app, così si impara
 * una volta: in alto la domanda, sotto cosa succede, in fondo "Indietro" e
 * l'azione, con lo stesso nome del pulsante che l'ha aperta.
 *
 * Su computer è una finestra al centro; su telefono sale dal basso, a portata
 * di pollice, come tutti i pannelli dell'app (issue #145). In entrambi i casi
 * è un `alertdialog`: chi usa lo screen reader sente che si chiede conferma.
 *
 * La finestra si chiude quando l'azione è finita, non al tocco: chi la usa
 * chiude con `onChiudi` dopo aver letto l'esito. Mentre l'azione è in corso
 * non si chiude. Dentro (`children`) può stare un campo, per esempio la nota
 * di un rifiuto.
 */
export function ResponsiveConfirm({
  open,
  onClose,
  title,
  description,
  children,
  action,
  onConfirm,
  busy = false,
  actionDisabled = false,
  cancelLabel = "Indietro",
  onCancel,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  /** Il testo del pulsante che conferma. */
  action: ReactNode;
  onConfirm: () => unknown;
  busy?: boolean;
  actionDisabled?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}) {
  const largo = useWideScreen();

  if (!largo) {
    return (
      <Drawer open={open} dismissible={!busy} onOpenChange={(o) => !o && !busy && onClose()}>
        <DrawerContent role="alertdialog" onEscapeKeyDown={(e) => { if (busy) e.preventDefault(); }}>
          <div className="mx-auto w-full max-w-md space-y-4 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <DrawerHeader className="px-0 text-left">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            {children}
            {/* L'azione in alto, sotto il pollice; "Indietro" sotto. */}
            <div className="flex flex-col gap-2">
              <Button type="button" disabled={busy || actionDisabled} onClick={() => void onConfirm()}>
                {action}
              </Button>
              <Button type="button" variant="outline" disabled={busy} onClick={onCancel ?? onClose}>
                {cancelLabel}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && !busy && onClose()}>
      <AlertDialogContent onEscapeKeyDown={(e) => { if (busy) e.preventDefault(); }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        {/* "Indietro" a sinistra e l'azione a destra, staccati. Lo spazio fra i
            due lo dà il DS: azzerarlo li attaccava (issue #105). */}
        <AlertDialogFooter className="gap-3 sm:justify-between">
          <AlertDialogCancel disabled={busy} onClick={(e) => {
            if (onCancel) {
              e.preventDefault();
              onCancel();
            }
          }}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={busy || actionDisabled}
            onClick={(e) => {
              e.preventDefault();
              void onConfirm();
            }}
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
