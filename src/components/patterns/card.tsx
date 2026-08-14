import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

/**
 * Toni semantici condivisi da `accent`/`state`/`CardStat`/`CardRow`: l'accento
 * dice di cosa fa parte una card, la tinta/il colore del valore dicono com'è
 * andata. Stessi token già verificati per contrasto su `--card` (vedi
 * `src/index.css`, sezione `--positive`/`--negative`/`--warning`).
 */
export type CardTone = "primary" | "success" | "warning" | "destructive";

const TONE_COLOR: Record<CardTone, string> = {
  primary: "var(--primary-text)",
  success: "var(--positive)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
};

type CardDensity = "comfortable" | "compact";

const DENSITY_PADDING: Record<CardDensity, { header: string; content: string; footer: string }> = {
  comfortable: { header: "p-6", content: "p-6 pt-0", footer: "p-6 pt-0" },
  compact: { header: "p-4", content: "p-4 pt-0", footer: "p-4 pt-0" },
};

const CardDensityContext = React.createContext<CardDensity>("comfortable");

const cardVariants = cva("border bg-card text-card-foreground", {
  variants: {
    variant: {
      // Superficie neutra.
      default: "",
      // Bordo sinistro colorato: segna appartenenza (ciclo, sezione), non esito.
      // 2px, non di più: un bordo spesso legge come una fascia decorativa
      // invece che come un accento.
      accent: "border-l-2",
      // Sfondo tinto: per gli esiti (differenziali, saldi, confronti).
      state: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Bordo sinistro (`accent`) o sfondo (`state`) tinti con questo tono. */
  tone?: CardTone;
  /** Padding di `CardHeader`/`CardContent`/`CardFooter` dentro questa card. */
  density?: CardDensity;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", tone, density = "comfortable", style, ...props }, ref) => {
    const toneColor = tone ? TONE_COLOR[tone] : undefined;
    const toneStyle: React.CSSProperties = {};
    if (toneColor) {
      if (variant === "accent") {
        toneStyle.borderLeftColor = toneColor;
      } else if (variant === "state") {
        toneStyle.backgroundColor = `color-mix(in oklab, ${toneColor} 10%, var(--card))`;
        toneStyle.borderColor = `color-mix(in oklab, ${toneColor} 35%, transparent)`;
      }
    }
    return (
      <CardDensityContext.Provider value={density}>
        <div
          ref={ref}
          className={cn(cardVariants({ variant }), className)}
          style={{ ...toneStyle, ...style }}
          {...props}
        />
      </CardDensityContext.Provider>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const density = React.useContext(CardDensityContext);
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", DENSITY_PADDING[density].header, className)}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Tag reso. Di default `h3`: la card è quasi sempre una sotto-sezione della
   * pagina (che tiene il proprio `h1`/`h2`), non l'introduzione ex-novo di un
   * documento — vedi `agent_docs`/issue t40-ds#60. Passa `h2` quando la card è
   * davvero la prima intestazione di una sezione di pagina, o `div` per un
   * titolo puramente visivo (es. l'etichetta di una `CardStat` esterna a un
   * flusso di intestazioni).
   */
  as?: "h2" | "h3" | "h4" | "div";
}

// Stessa scala di src/docs/Typography.mdx ("Scala dei titoli"): h2 sezione/dialog
// a piena pagina (text-xl), h3 titolo di card (text-base), h4 sottogruppo dentro
// una card (text-sm).
const TITLE_SIZE: Record<NonNullable<CardTitleProps["as"]>, string> = {
  h2: "text-xl",
  h3: "text-base",
  h4: "text-sm",
  div: "text-base",
};

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as = "h3", ...props }, ref) => {
    const Comp = as as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", TITLE_SIZE[as], className)}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const density = React.useContext(CardDensityContext);
    return <div ref={ref} className={cn(DENSITY_PADDING[density].content, className)} {...props} />;
  },
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const density = React.useContext(CardDensityContext);
    return (
      <div
        ref={ref}
        className={cn("flex items-center", DENSITY_PADDING[density].footer, className)}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export interface CardStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Icona mostrata prima dell'etichetta (16px, decorativa). */
  icon?: React.ElementType;
  /** Colora il valore. `"muted"` (default) lo lascia sul colore di testo normale. */
  tone?: CardTone | "muted";
}

/**
 * Etichetta piccola + valore grande: il pattern più ripetuto a mano nelle app
 * consumer (dashboard, riepiloghi, differenziali — vedi t40-ds#60). `min-w-0`
 * + `break-words` di proposito: dentro una grid/flex stretta un valore lungo
 * e non spezzabile (es. valuta `Intl.NumberFormat` con spazio unificatore
 * prima di "€") trabocca invece di andare a capo, e sovrappone la colonna
 * vicina — bug osservato in ast40#85.
 */
const CardStat = React.forwardRef<HTMLDivElement, CardStatProps>(
  ({ className, label, value, icon: Icon, tone = "muted", ...props }, ref) => {
    const color = tone === "muted" ? undefined : TONE_COLOR[tone];
    return (
      <div ref={ref} className={cn("min-w-0 space-y-1", className)} {...props}>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {Icon && <Icon size={14} aria-hidden="true" />}
          {label}
        </p>
        <p
          className="break-words text-xl font-semibold tabular-nums"
          style={color ? { color } : undefined}
        >
          {value}
        </p>
      </div>
    );
  },
);
CardStat.displayName = "CardStat";

export interface CardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Colora il valore. Assente = colore di testo normale. */
  tone?: CardTone;
}

/** Etichetta a sinistra, valore a destra: righe di lista dentro una card. */
const CardRow = React.forwardRef<HTMLDivElement, CardRowProps>(
  ({ className, label, value, tone, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-3 py-2", className)}
      {...props}
    >
      <span className="min-w-0 truncate text-sm text-muted-foreground">{label}</span>
      <span
        className="shrink-0 text-sm font-medium tabular-nums"
        style={tone ? { color: TONE_COLOR[tone] } : undefined}
      >
        {value}
      </span>
    </div>
  ),
);
CardRow.displayName = "CardRow";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardStat,
  CardRow,
};
