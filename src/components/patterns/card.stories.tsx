import type { Meta, StoryObj } from "@storybook/react-vite";
import { PiggyBank, RotateCcw, Scale, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRow,
  CardStat,
  CardTitle,
} from "./card";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`CardTitle` è un'intestazione semantica vera (`h3` di default, `as=\"h2\"|\"h4\"|\"div\"` per gli altri casi) — non serve più avvolgerla a mano in un tag `<h2>`. `variant`/`tone` distinguono **appartenenza** (`accent`, bordo laterale) da **esito** (`state`, sfondo tinto). `density=\"compact\"` stringe il padding di header/content/footer per le viste dense di dati. `CardStat` e `CardRow` coprono i due pattern più ripetuti a mano nelle app consumer (etichetta+valore grande, riga lista) — vedi issue t40-ds#60.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-80">
      <CardHeader>
        <CardTitle>Riepilogo Agosto</CardTitle>
        <CardDescription>Aggio e spese del mese corrente</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Aggio: 3.845,85 €</p>
        <p>Spese: 9.088,08 €</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Vedi dettaglio</Button>
      </CardFooter>
    </Card>
  ),
};

export const ConIcona: Story = {
  name: "Con icona",
  render: () => (
    <Card className="w-full max-w-80">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Wallet className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <CardTitle as="h4">Cassa</CardTitle>
          <CardDescription>Saldo disponibile oggi</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-2xl font-semibold">2.140,00 €</p>
      </CardContent>
    </Card>
  ),
};

export const ConFooterAzioni: Story = {
  name: "Con footer azioni",
  render: () => (
    <Card className="w-full max-w-80">
      <CardHeader>
        <CardTitle as="h4">Chiudi cassa del giorno</CardTitle>
        <CardDescription>Verifica l'incasso prima di confermare.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Incasso rilevato: 1.284,50 €</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Conferma</Button>
        <Button size="sm" variant="outline">
          Annulla
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const VariantiEToni: Story = {
  name: "Varianti e toni",
  parameters: {
    docs: {
      description: {
        story:
          "`default` è la superficie neutra. `accent` (bordo laterale) segna **appartenenza** — a cosa fa parte questa card, non se è andata bene o male. `state` (sfondo tinto) segna **l'esito** — usalo per differenziali, saldi, confronti. Verifica sempre in entrambi i temi (toolbar in alto): i toni sono gli stessi token verificati per contrasto di `--positive`/`--negative`/`--warning`/`--destructive`.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card density="compact">
        <CardHeader>
          <CardTitle as="h4">Default</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Superficie neutra.</CardContent>
      </Card>
      <Card variant="accent" tone="primary" density="compact">
        <CardHeader>
          <CardTitle as="h4">Accent · primary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Ciclo A, sezione attiva.</CardContent>
      </Card>
      <Card variant="state" tone="success" density="compact">
        <CardHeader>
          <CardTitle as="h4">State · success</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Chiusura in pareggio.</CardContent>
      </Card>
      <Card variant="accent" tone="warning" density="compact">
        <CardHeader>
          <CardTitle as="h4">Accent · warning</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Ciclo B, in attesa.</CardContent>
      </Card>
      <Card variant="state" tone="destructive" density="compact">
        <CardHeader>
          <CardTitle as="h4">State · destructive</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Differenziale negativo.</CardContent>
      </Card>
      <Card variant="accent" tone="destructive" density="compact">
        <CardHeader>
          <CardTitle as="h4">Accent · destructive</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Sezione a rischio.</CardContent>
      </Card>
    </div>
  ),
};

export const Densita: Story = {
  name: "Densità",
  parameters: {
    docs: {
      description: {
        story:
          "`comfortable` (default, `p-6`) per card isolate. `compact` (`p-4`) per viste dense — griglie di molte card, aree admin — dove il padding largo era il motivo per cui `CardHeader`/`CardContent` finivano disertati a favore di markup scritto a mano (issue t40-ds#60).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card className="w-full max-w-64">
        <CardHeader>
          <CardTitle as="h4">Comfortable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Padding p-6.</CardContent>
      </Card>
      <Card density="compact" className="w-full max-w-64">
        <CardHeader>
          <CardTitle as="h4">Compact</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Padding p-4.</CardContent>
      </Card>
    </div>
  ),
};

export const StatisticaKPI: Story = {
  name: "Statistica / KPI (CardStat)",
  parameters: {
    docs: {
      description: {
        story:
          "`CardStat` sostituisce il markup ripetuto a mano per etichetta+valore. Il delta non usa mai solo il colore — l'icona (Trending Up/Down) e il segno (+/-) restano leggibili anche senza percepire rosso/verde (WCAG 1.4.1). `min-w-0`/`break-words` sono di proposito: un valore in valuta (`Intl.NumberFormat`, spazio unificatore prima di \"€\") non si spezza da solo, e dentro una card stretta trabocca sulla colonna vicina invece di andare a capo (bug osservato in ast40#85).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card className="w-full max-w-56">
        <CardContent className="pt-6">
          <CardStat label="Aggio del mese" value="3.845,85 €" tone="success" />
          <p
            className="mt-2 flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--positive)" }}
          >
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            +15,2% rispetto a luglio
          </p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-56">
        <CardContent className="pt-6">
          <CardStat label="Spese del mese" value="9.088,08 €" tone="destructive" />
          <p
            className="mt-2 flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--negative)" }}
          >
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
            -77,0% rispetto a luglio
          </p>
        </CardContent>
      </Card>
      <Card className="w-24">
        <CardContent className="pt-6">
          <CardStat label="Cassa" value="2.140,00 €" icon={PiggyBank} />
        </CardContent>
      </Card>
    </div>
  ),
};

export const RiepilogoConCardStat: Story = {
  name: "Riepilogo a più CardStat",
  parameters: {
    docs: {
      description: {
        story:
          "Tre `CardStat` affiancate dentro un'unica card — il pattern \"riporto & differenziali\" di ast40, prima fatto con `<div className=\"bg-muted\">` senza motivo: il colore del valore basta a segnare l'esito, non serve uno sfondo grigio per cella.",
      },
    },
  },
  render: () => (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-4">
        <CardTitle>Riporto &amp; differenziali</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CardStat icon={RotateCcw} label="Riporto mese precedente" value="1.204,50 €" tone="success" />
          <div className="sm:border-l sm:border-border sm:pl-4">
            <CardStat icon={Scale} label="Saldo mese corrente" value="-320,15 €" tone="destructive" />
          </div>
          <div className="sm:border-l sm:border-border sm:pl-4">
            <CardStat icon={PiggyBank} label="Cassa finale (anno)" value="884,35 €" tone="success" />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const RigheDiLista: Story = {
  name: "Righe di lista (CardRow)",
  parameters: {
    docs: {
      description: {
        story: "`CardRow` per liste dentro una card — es. lo storico dei cicli in gt40.",
      },
    },
  },
  render: () => (
    <Card className="w-full max-w-80" density="compact">
      <CardContent className="pt-4">
        <CardRow label="Ciclo A — 1 ago" value="+142,30 €" tone="success" />
        <CardRow label="Ciclo B — 1 ago" value="-58,10 €" tone="destructive" />
        <CardRow label="Ciclo A — 2 ago" value="+96,00 €" tone="success" />
      </CardContent>
    </Card>
  ),
};

export const Minimale: Story = {
  name: "Minimale",
  parameters: {
    docs: {
      description: {
        story: "Solo `CardContent`, senza `CardHeader`/`CardFooter` — per contenuto che non ha bisogno di titolo o azioni.",
      },
    },
  },
  render: () => (
    <Card className="w-full max-w-80">
      <CardContent className="pt-6 text-sm text-muted-foreground">
        Nessun movimento registrato oggi.
      </CardContent>
    </Card>
  ),
};
