import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      // richColors di default: senza, l'icona di toast.success/.warning/.error
      // eredita currentColor (quasi nera) invece del verde/ambra/rosso
      // semantico — misurato, non presunto: un consumer lo segnalava con
      // l'icona di conferma indistinguibile da quella di errore. Il mapping
      // ai token del DS è in index.css (selettore [data-sonner-toaster]),
      // non qui: sonner legge --success-bg/-text/-border ecc. da una regola
      // CSS iniettata a runtime sul proprio elemento, e un override passato
      // come style prop a questo componente non è garantito vincere quella
      // cascata — la regola in index.css sì, a specificità pari o superiore.
      // Un consumer che vuole il monocromatico può passare richColors={false}
      // esplicitamente, {...props} sotto vince.
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
