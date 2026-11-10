import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CalendarDays, Plus, Users } from "lucide-react";
import { Button } from "../atoms/button";
import { EmptyState } from "./empty-state";

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

const meta = {
  title: "Patterns/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "Nessuna richiesta da gestire",
    description: "Quando qualcuno chiede ferie o una richiesta speciale, la trovi qui.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Stato vuoto o di errore dentro una pagina (issue #124). Titolo e testo, non un'illustrazione: sul telefono lo spazio è poco. La versione `error` è per un caricamento non riuscito: lo dice senza colpe e offre **Riprova**, perché nell'app installata non c'è il tasto per ricaricare. Per un crollo di tutta l'app c'è `ErrorPage`.",
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: <CalendarDays /> },
};

export const ConAzione: Story = {
  name: "Con un'azione",
  args: {
    icon: <Users />,
    title: "Nessun dipendente",
    description: "Aggiungi chi lavora in negozio: riceverà una password provvisoria.",
    action: (
      <Button>
        <Plus aria-hidden="true" /> Aggiungi un dipendente
      </Button>
    ),
  },
};

function ErroreConRiprova() {
  const [riprovando, setRiprovando] = useState(false);
  return (
    <EmptyState
      variant="error"
      title="Non riesco a caricare gli orari"
      description="Controlla la connessione e riprova."
      retrying={riprovando}
      onRetry={() => {
        setRiprovando(true);
        setTimeout(() => setRiprovando(false), 1500);
      }}
    />
  );
}

export const Errore: Story = {
  name: "Errore, con Riprova",
  render: () => <ErroreConRiprova />,
};

export const RiempieLoSpazio: Story = {
  name: "Riempie lo spazio",
  render: () => (
    <div className="flex h-[28rem] flex-col">
      <EmptyState fill icon={<CalendarDays />} title="Non lavori questa settimana" description="Riposo o ferie: goditela." />
    </div>
  ),
};

export const SulTelefono: Story = {
  name: "Sul telefono (360 px)",
  render: () => (
    <div className="flex min-h-[600px] flex-col gap-4 p-4">
      <EmptyState
        fill
        variant="error"
        title="Non riesco a caricare i turni"
        description="Controlla la connessione e riprova."
        onRetry={() => {}}
        action={<Button variant="ghost">Torna ai turni</Button>}
      />
    </div>
  ),
  ...TELEFONO,
};
