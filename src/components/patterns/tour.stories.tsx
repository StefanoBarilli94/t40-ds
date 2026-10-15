import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRight, Bell, CalendarDays, Hand, Inbox, TreePalm, User } from "lucide-react";
import { Button } from "../atoms/button";
import { BottomNav, BottomNavItem } from "./bottom-nav";
import { Tour, type TourStep } from "./tour";

const meta = {
  title: "Patterns/Tour",
  component: Tour,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Guida a passi sopra l'interfaccia (issue #100). Un riquadro per passo con Avanti, Indietro e Salta; l'elemento di cui si parla resta in luce, il resto si scurisce con un velo. Su telefono il riquadro si appoggia in basso. Esc salta, le frecce cambiano passo. Quando mostrarlo e ricordarsi che è stato visto lo decide l'app.",
      },
    },
  },
  args: { steps: [], open: false, onClose: () => {} },
} satisfies Meta<typeof Tour>;

export default meta;
type Story = StoryObj<typeof meta>;

const BENVENUTO: TourStep[] = [
  {
    icon: <Hand />,
    title: "Ciao Ilaria!",
    description: "Ti mostriamo in quattro passi dove trovi le cose. Puoi saltare quando vuoi.",
  },
  {
    target: '[data-tour="turni"]',
    icon: <CalendarDays />,
    title: "I tuoi turni",
    description: "Qui vedi quando lavori, settimana per settimana. Da un turno puoi chiedere un cambio.",
  },
  {
    target: '[data-tour="richieste"]',
    icon: <Inbox />,
    title: "Ferie e cambi",
    description: "Qui chiedi le ferie e segui le tue richieste, finché qualcuno risponde.",
  },
  {
    target: '[data-tour="avvisi"]',
    icon: <Bell />,
    title: "Avvisi",
    description: "Turni pubblicati, risposte alle richieste: tutto quello che ti riguarda arriva qui.",
  },
  {
    target: '[data-tour="profilo"]',
    icon: <User />,
    title: "Il tuo profilo",
    description: "La tua foto, il cellulare e la password. Da qui puoi anche rivedere questa guida.",
  },
];

function Telefono() {
  const [aperto, setAperto] = React.useState(true);
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1 space-y-3 p-4">
        <h1 className="text-xl font-semibold">Turni</h1>
        <p className="text-sm text-muted-foreground">Una pagina qualsiasi dell'app, sotto la guida.</p>
        <Button variant="outline" onClick={() => setAperto(true)}>
          Rivedi la guida
        </Button>
      </main>
      <BottomNav className="md:flex">
        <BottomNavItem isActive data-tour="turni">
          <CalendarDays aria-hidden="true" />
          <span>Turni</span>
        </BottomNavItem>
        <BottomNavItem data-tour="richieste">
          <Inbox aria-hidden="true" />
          <span>Richieste</span>
        </BottomNavItem>
        <BottomNavItem data-tour="avvisi">
          <Bell aria-hidden="true" />
          <span>Avvisi</span>
        </BottomNavItem>
        <BottomNavItem data-tour="profilo">
          <User aria-hidden="true" />
          <span>Profilo</span>
        </BottomNavItem>
      </BottomNav>
      <Tour steps={BENVENUTO} open={aperto} onClose={() => setAperto(false)} />
    </div>
  );
}

/** Il benvenuto al primo ingresso, su telefono: il riquadro sta in basso. */
export const BenvenutoSuTelefono: Story = {
  render: () => <Telefono />,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

const FERIE: TourStep[] = [
  {
    target: '[data-tour="date"]',
    icon: <TreePalm />,
    title: "Quali giorni",
    description: "Scegli il primo e l'ultimo giorno. Le ferie si chiedono per i giorni a venire.",
  },
  {
    target: '[data-tour="riposo"]',
    title: "Il riposo è una scelta tua",
    description: "Per ogni settimana decidi se usare un giorno come riposo. L'app non sceglie al posto tuo.",
  },
  {
    target: '[data-tour="invia"]',
    icon: <ArrowLeftRight />,
    title: "Invia e aspetta la risposta",
    description: "La richiesta parte subito. Quando viene decisa ti arriva un avviso.",
  },
];

function Computer() {
  const [aperto, setAperto] = React.useState(true);
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-8">
      <h1 className="text-xl font-semibold">Nuova richiesta ferie</h1>
      <div data-tour="date" className="grid grid-cols-2 gap-3 border border-border bg-card p-4">
        <div className="h-12 border border-input bg-card" />
        <div className="h-12 border border-input bg-card" />
      </div>
      <div data-tour="riposo" className="h-32 border border-border bg-card p-4 text-sm text-muted-foreground">
        Riposo, settimana 19 – 25 ottobre
      </div>
      <div className="flex justify-end">
        <Button data-tour="invia">Invia la richiesta</Button>
      </div>
      <Tour steps={FERIE} open={aperto} onClose={() => setAperto(false)} />
      {!aperto && (
        <Button variant="outline" onClick={() => setAperto(true)}>
          Rivedi la guida
        </Button>
      )}
    </div>
  );
}

/** Una guida su una funzione, su computer: il riquadro sta sotto l'elemento, o sopra se sotto non c'è posto. */
export const SuComputer: Story = {
  render: () => <Computer />,
};
