import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, CalendarDays, Inbox, Settings, User } from "lucide-react";
import { BottomNav, BottomNavBadge, BottomNavItem, BottomNavSpacer } from "./bottom-nav";

/**
 * Schermo di telefono finto. Il `transform` fa da riferimento al `fixed` della
 * barra, che così resta dentro il riquadro invece di attaccarsi alla finestra
 * di Storybook. `md:block` la tiene visibile anche su una finestra larga: nelle
 * app sparisce da `md` in su.
 */
function Telefono({ children, larghezza = 360 }: { children: React.ReactNode; larghezza?: number }) {
  return (
    <div
      className="relative flex h-[520px] flex-col overflow-hidden border border-border bg-background"
      // Larghezza esplicita e non `w-full`: con `layout: "centered"` il
      // contenitore si stringe sul contenuto, e qui il contenuto è `fixed`.
      style={{ transform: "translateZ(0)", width: `min(${larghezza}px, calc(100vw - 3rem))` }}
    >
      {children}
    </div>
  );
}

const voci = [
  { id: "turni", label: "Turni", icon: CalendarDays },
  { id: "richieste", label: "Richieste", icon: Inbox },
  { id: "avvisi", label: "Avvisi", icon: Bell },
  { id: "profilo", label: "Profilo", icon: User },
] as const;

/** Barra di prova con stato: nelle app la voce attiva la decide il router. */
function Barra({ contatori = false }: { contatori?: boolean }) {
  const [attiva, setAttiva] = React.useState("turni");
  return (
    <BottomNav className="md:block">
      {voci.map(({ id, label, icon: Icon }) => (
        <BottomNavItem key={id} isActive={attiva === id} onClick={() => setAttiva(id)}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
          {contatori && id === "richieste" && (
            <BottomNavBadge label="2 richieste da gestire">2</BottomNavBadge>
          )}
          {contatori && id === "avvisi" && (
            <BottomNavBadge label="12 avvisi non letti">12</BottomNavBadge>
          )}
        </BottomNavItem>
      ))}
    </BottomNav>
  );
}

const meta = {
  title: "Patterns/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Navigazione principale su telefono: una barra fissa in fondo allo schermo, da 3 a 5 voci, ognuna con icona **e** testo. È la stessa navigazione della `Sidebar` in un'altra posizione, quindi ne usa i token (`--sidebar-*`), e sparisce da `md` in su, dove la navigazione torna a essere la `Sidebar`. La voce attiva non si distingue solo dal colore: ha una barra in alto, lo sfondo, il peso del testo e `aria-current=\"page\"` (WCAG 1.4.1). Ogni voce è alta 56px, sopra i 44 raccomandati per il tocco. La barra rispetta `env(safe-area-inset-bottom)`: perché funzioni, l'app deve avere `viewport-fit=cover` nel meta viewport. In fondo alla pagina va messo `BottomNavSpacer`, altrimenti l'ultimo contenuto resta nascosto sotto la barra.",
      },
    },
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuattroVoci: Story = {
  name: "Quattro voci",
  render: () => (
    <Telefono>
      <div className="flex-1 overflow-y-auto p-4 text-sm text-muted-foreground">
        Tocca una voce per cambiare pagina.
        <BottomNavSpacer className="md:block" />
      </div>
      <Barra />
    </Telefono>
  ),
};

export const ConContatore: Story = {
  name: "Con contatore",
  parameters: {
    docs: {
      description: {
        story:
          "`BottomNavBadge` va **dentro** la voce: così il suo `label` (\"3 avvisi non letti\") entra nel nome letto dallo screen reader, invece di restare un numero senza contesto.",
      },
    },
  },
  render: () => (
    <Telefono>
      <div className="flex-1" />
      <Barra contatori />
    </Telefono>
  ),
};

export const ComeLink: Story = {
  name: "Con i link del router",
  parameters: {
    docs: {
      description: {
        story:
          "Il componente non conosce il router: con `asChild` la voce diventa il `Link` dell'app, come `SidebarMenuButton`. Qui al posto del `Link` c'è un `<a>`.",
      },
    },
  },
  render: () => (
    <Telefono>
      <div className="flex-1" />
      <BottomNav className="md:block">
        {voci.map(({ id, label, icon: Icon }) => (
          <BottomNavItem key={id} asChild isActive={id === "richieste"}>
            <a href={`#${id}`}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          </BottomNavItem>
        ))}
      </BottomNav>
    </Telefono>
  ),
};

export const TreECinqueVoci: Story = {
  name: "Tre e cinque voci",
  parameters: {
    docs: {
      description: {
        story:
          "I due estremi. A cinque voci su uno schermo da 320px un'etichetta lunga viene troncata: meglio parole corte.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6">
      {[voci.slice(0, 3), [...voci, { id: "altro", label: "Impostazioni", icon: Settings }]].map((gruppo, i) => (
        <div key={i}>
          <Telefono larghezza={320}>
            <div className="flex-1" />
            <BottomNav className="md:block">
              {gruppo.map(({ id, label, icon: Icon }, n) => (
                <BottomNavItem key={id} isActive={n === 0}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </BottomNavItem>
              ))}
            </BottomNav>
          </Telefono>
        </div>
      ))}
    </div>
  ),
};
