import type { Meta, StoryObj } from "@storybook/react-vite";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`CardTitle`/`CardDescription` sono semplici `<div>` stilizzati, non intestazioni semantiche (`h1..h6`): se la card introduce una sezione della pagina, avvolgere il testo in un tag di intestazione appropriato passandolo come `asChild`-style o children con `<h2>`.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          <h2 className="text-base font-semibold">Riepilogo Agosto</h2>
        </CardTitle>
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
    <Card className="w-80">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Wallet className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <CardTitle>
            <h2 className="text-base font-semibold">Cassa</h2>
          </CardTitle>
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
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          <h2 className="text-base font-semibold">Chiudi cassa del giorno</h2>
        </CardTitle>
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

export const StatisticaKPI: Story = {
  name: "Statistica / KPI",
  parameters: {
    docs: {
      description: {
        story:
          "Replica il pattern delle card statistiche della dashboard: valore grande + delta rispetto al periodo precedente. Il delta non usa mai solo il colore — l'icona (Trending Up/Down) e il segno (+/-) restano leggibili anche senza percepire rosso/verde (WCAG 1.4.1).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card className="w-56">
        <CardHeader className="space-y-0 pb-2">
          <CardDescription>Aggio del mese</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">3.845,85 €</p>
          <p
            className="mt-1 flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--positive)" }}
          >
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            +15,2% rispetto a luglio
          </p>
        </CardContent>
      </Card>
      <Card className="w-56">
        <CardHeader className="space-y-0 pb-2">
          <CardDescription>Spese del mese</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">9.088,08 €</p>
          <p
            className="mt-1 flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--negative)" }}
          >
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
            -77,0% rispetto a luglio
          </p>
        </CardContent>
      </Card>
    </div>
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
    <Card className="w-80">
      <CardContent className="pt-6 text-sm text-muted-foreground">
        Nessun movimento registrato oggi.
      </CardContent>
    </Card>
  ),
};
