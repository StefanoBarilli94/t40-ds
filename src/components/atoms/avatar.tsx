import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Stato dell'immagine, condiviso fra `AvatarImage` e `AvatarFallback`: le
 * iniziali si vedono finché la foto non è davvero arrivata, e tornano se non
 * arriva.
 *
 * Fatto con stato React invece che con `@radix-ui/react-avatar`: il pacchetto
 * è distribuito come sorgente e ogni dipendenza pesa su tutte le app (vedi
 * agent_docs/component-conventions.md). Il primitivo era stato tolto con la
 * #27; il componente torna con la #71, la dipendenza no.
 */
type StatoImmagine = "attesa" | "caricata" | "errore";

const AvatarContext = React.createContext<{
  stato: StatoImmagine;
  setStato: (s: StatoImmagine) => void;
} | null>(null);

function useAvatar(nome: string) {
  const ctx = React.useContext(AvatarContext);
  if (!ctx) throw new Error(`${nome} va usato dentro <Avatar>`);
  return ctx;
}

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none overflow-hidden bg-muted align-middle font-medium text-foreground",
  {
    variants: {
      // `sm` sta dentro una riga di testo o una fascia di turno, `md` è la
      // misura di una voce d'elenco, `lg` quella di una scheda profilo.
      size: {
        sm: "size-6 text-[11px]",
        md: "size-10 text-sm",
        lg: "size-16 text-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

/**
 * Foto tonda di una persona, con le iniziali quando la foto manca.
 *
 * Il tondo è un'eccezione dichiarata al reset "niente angoli arrotondati":
 * vive in `src/index.css` su `[data-slot="avatar"]`, non qui.
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => {
    const [stato, setStato] = React.useState<StatoImmagine>("attesa");
    const valore = React.useMemo(() => ({ stato, setStato }), [stato]);
    return (
      <AvatarContext.Provider value={valore}>
        <span
          ref={ref}
          data-slot="avatar"
          className={cn(avatarVariants({ size }), className)}
          {...props}
        />
      </AvatarContext.Provider>
    );
  },
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  /** Il nome della persona. Obbligatorio: senza, la foto non dice niente a uno screen reader. */
  alt: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onLoad, onError, ...props }, ref) => {
    const { stato, setStato } = useAvatar("AvatarImage");
    const locale = React.useRef<HTMLImageElement | null>(null);

    // Una foto nuova riparte da capo. E se il browser l'aveva già in cache,
    // `load` può essere scattato prima che React attaccasse l'ascoltatore:
    // senza questo controllo resterebbero le iniziali sopra una foto arrivata.
    React.useLayoutEffect(() => {
      const img = locale.current;
      if (!src) setStato("errore");
      else if (img?.complete && img.naturalWidth > 0) setStato("caricata");
      else setStato("attesa");
    }, [src, setStato]);

    if (!src || stato === "errore") return null;

    return (
      <img
        ref={(nodo) => {
          locale.current = nodo;
          if (typeof ref === "function") ref(nodo);
          else if (ref) ref.current = nodo;
        }}
        src={src}
        alt={alt}
        className={cn(
          "aspect-square size-full object-cover",
          stato !== "caricata" && "hidden",
          className,
        )}
        onLoad={(e) => {
          setStato("caricata");
          onLoad?.(e);
        }}
        onError={(e) => {
          setStato("errore");
          onError?.(e);
        }}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const { stato } = useAvatar("AvatarFallback");
    if (stato === "caricata") return null;
    return (
      <span
        ref={ref}
        className={cn("flex size-full items-center justify-center uppercase", className)}
        {...props}
      />
    );
  },
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
