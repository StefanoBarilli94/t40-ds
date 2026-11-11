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
  aperto,
  onChiudi,
  titolo,
  descrizione,
  children,
  azione,
  onConferma,
  occupato = false,
  azioneDisabilitata = false,
  annulla = "Indietro",
  onAnnulla,
}: {
  aperto: boolean;
  onChiudi: () => void;
  titolo: ReactNode;
  descrizione: ReactNode;
  children?: ReactNode;
  /** Il testo del pulsante che conferma. */
  azione: ReactNode;
  onConferma: () => unknown;
  occupato?: boolean;
  azioneDisabilitata?: boolean;
  annulla?: string;
  onAnnulla?: () => void;
}) {
  const largo = useWideScreen();

  if (!largo) {
    return (
      <Drawer open={aperto} dismissible={!occupato} onOpenChange={(o) => !o && !occupato && onChiudi()}>
        <DrawerContent role="alertdialog" onEscapeKeyDown={(e) => { if (occupato) e.preventDefault(); }}>
          <div className="mx-auto w-full max-w-md space-y-4 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <DrawerHeader className="px-0 text-left">
              <DrawerTitle>{titolo}</DrawerTitle>
              <DrawerDescription>{descrizione}</DrawerDescription>
            </DrawerHeader>
            {children}
            {/* L'azione in alto, sotto il pollice; "Indietro" sotto. */}
            <div className="flex flex-col gap-2">
              <Button type="button" disabled={occupato || azioneDisabilitata} onClick={() => void onConferma()}>
                {azione}
              </Button>
              <Button type="button" variant="outline" disabled={occupato} onClick={onAnnulla ?? onChiudi}>
                {annulla}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog open={aperto} onOpenChange={(o) => !o && !occupato && onChiudi()}>
      <AlertDialogContent onEscapeKeyDown={(e) => { if (occupato) e.preventDefault(); }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{titolo}</AlertDialogTitle>
          <AlertDialogDescription>{descrizione}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        {/* "Indietro" a sinistra e l'azione a destra, staccati. Lo spazio fra i
            due lo dà il DS: azzerarlo li attaccava (issue #105). */}
        <AlertDialogFooter className="gap-3 sm:justify-between">
          <AlertDialogCancel disabled={occupato} onClick={(e) => {
            if (onAnnulla) {
              e.preventDefault();
              onAnnulla();
            }
          }}>
            {annulla}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={occupato || azioneDisabilitata}
            onClick={(e) => {
              e.preventDefault();
              void onConferma();
            }}
          >
            {azione}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
