import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, MapPinOff, WifiOff } from "lucide-react";
import { Button } from "../atoms/button";
import { ErrorPage } from "./error-page";

const meta = {
  title: "Patterns/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pagina di errore (issue #97): icona, codice facoltativo, titolo, testo e i pulsanti per ripartire. Il testo lo sceglie l'app; la regola è dire cosa è successo senza colpe e dare sempre una strada per uscire. `fullScreen` quando si è rotto il guscio dell'app (titolo `h1`), senza quando sta dentro il guscio (titolo `h2`).",
      },
    },
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaginaNonTrovata: Story = {
  args: {
    icon: <MapPinOff />,
    code: "404",
    title: "Ti sei persa?",
    description: "Questa pagina non c'è. Riparti dall'inizio.",
    actions: <Button className="h-12 sm:h-10">Riparti dall'inizio</Button>,
  },
};

export const ErroreImprevisto: Story = {
  args: {
    fullScreen: true,
    icon: <CircleAlert />,
    title: "Mmm, qualcosa non va",
    description: "Non è colpa tua. Riprova tra poco; se succede ancora, chiedi ad Andrea cosa sta succedendo.",
    actions: (
      <>
        <Button className="h-12 sm:h-10">Riprova</Button>
        <Button variant="outline" className="h-12 sm:h-10">
          Vai alla pagina iniziale
        </Button>
      </>
    ),
  },
};

export const SenzaConnessione: Story = {
  args: {
    icon: <WifiOff />,
    title: "Sei senza connessione",
    description: "Controlla il Wi-Fi o i dati del telefono, poi riprova.",
    actions: <Button className="h-12 sm:h-10">Riprova</Button>,
  },
};
