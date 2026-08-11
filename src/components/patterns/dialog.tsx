"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Se il click fuori dalla modale la chiude. Default `false` (issue #25).
   *
   * Il default di Radix è chiudere sempre: su una modale che contiene un form
   * significa perdere quanto digitato per un click di troppo, senza preavviso e
   * senza modo di recuperarlo. Qui il default è quello innocuo, e chi mostra
   * contenuto di sola lettura — dove non c'è niente da perdere e chiudere in
   * fretta è comodo — attiva la chiusura esplicitamente.
   *
   * Esc resta sempre attivo: è un gesto deliberato, il click fuori spesso no.
   */
  dismissOnOutsideClick?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>((
  {
    className,
    children,
    dismissOnOutsideClick = false,
    onPointerDownOutside,
    onInteractOutside,
    ...props
  },
  ref,
) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      onPointerDownOutside={(event) => {
        if (!dismissOnOutsideClick) event.preventDefault();
        onPointerDownOutside?.(event);
      }}
      onInteractOutside={(event) => {
        if (!dismissOnOutsideClick) event.preventDefault();
        onInteractOutside?.(event);
      }}
      className={cn(
        // Solo dissolvenza, niente scorrimento ne' zoom (issue #42).
        //
        // Prima c'erano `zoom-in-95`, `slide-in-from-left-1/2` e
        // `slide-in-from-top-[48%]`, ereditati da shadcn. In Tailwind v3
        // servivano a compensare il centraggio: `translate-x-[-50%]` finiva
        // dentro `transform`, e lo scarto d'ingresso lo annullava.
        //
        // In Tailwind v4 `translate-x-[-50%]` compila nella proprieta'
        // **`translate`**, che e' separata da `transform`. Le due si
        // COMPONGONO invece di sostituirsi, quindi durante l'ingresso la
        // modale partiva da circa -100%/-98% — l'angolo in alto a sinistra —
        // per arrivare a -50%/-50%. Verificato sul CSS compilato: sulla modale
        // aperta coesistono `translate: -50% -50%` e una `transform` con lo
        // stesso scarto. Una dissolvenza non tocca la posizione, quindi il
        // problema non puo' ripresentarsi al prossimo giro di Tailwind.
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-lg",
        // Tetto d'altezza e scroll interno (issue #48). Senza, `max-height` era
        // `none` e `overflow-y` `visible`: una modale piu' alta della finestra
        // sfora da entrambi i lati — e' centrata con translate-y(-50%) — e
        // quello che esce non si raggiunge, perche' Radix blocca lo scroll
        // della pagina sotto e la modale non ne aveva uno proprio.
        // Verificato con 30 righe: 1454px di contenuto, altezza limitata a
        // 687px, scroll interno attivo e ultima riga raggiungibile.
        //
        // `dvh` e non `vh`: su mobile la barra degli indirizzi che si ritrae
        // cambia `vh` e lascerebbe la modale piu' alta della finestra utile.
        // Il -2rem tiene un margine visibile sopra e sotto, cosi' si legge
        // come qualcosa di sovrapposto e non come una pagina.
        "max-h-[calc(100dvh-2rem)] overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
