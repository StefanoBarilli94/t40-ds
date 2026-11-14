import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Patterns/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="aggio" className="w-80">
      <TabsList>
        <TabsTrigger value="aggio">Aggio</TabsTrigger>
        <TabsTrigger value="spesa">Spesa</TabsTrigger>
      </TabsList>
      <TabsContent value="aggio" className="text-sm">
        Totale aggio: 3.845,85 €
      </TabsContent>
      <TabsContent value="spesa" className="text-sm">
        Totale spese: 9.088,08 €
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navigazione da tastiera integrata: Tab per entrare nel tablist, frecce sinistra/destra per cambiare tab (il fuoco resta sul trigger attivo, roving tabindex gestito da Radix).",
      },
    },
  },
};

const TELEFONO = {
  parameters: {
    layout: "fullscreen",
    viewport: { options: { telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } } } },
  },
  globals: { viewport: { value: "telefono", isRotated: false } },
};

/**
 * Quattro schede lunghe a 360 px (issue #118): l'elenco scorre dentro di sé,
 * con la sfumatura sul lato dove c'è dell'altro. La pagina non scorre di lato.
 * Ogni scheda è alta 44 px.
 */
export const SchedeLungheSulTelefono: Story = {
  name: "Schede lunghe sul telefono (360 px)",
  render: () => (
    <div className="space-y-6 p-4">
      <Tabs defaultValue="ferie">
        <TabsList aria-label="Richieste">
          <TabsTrigger value="ferie">Ferie e richieste speciali</TabsTrigger>
          <TabsTrigger value="malattie">Malattie</TabsTrigger>
          <TabsTrigger value="mie">Le mie richieste</TabsTrigger>
          <TabsTrigger value="storico">Storico</TabsTrigger>
        </TabsList>
        <TabsContent value="ferie" className="text-sm">Le ferie da approvare.</TabsContent>
        <TabsContent value="malattie" className="text-sm">Le malattie segnate.</TabsContent>
        <TabsContent value="mie" className="text-sm">Le tue richieste.</TabsContent>
        <TabsContent value="storico" className="text-sm">Le richieste passate.</TabsContent>
      </Tabs>
      <Tabs defaultValue="dipendenti">
        <TabsList variant="underline" aria-label="Impostazioni">
          <TabsTrigger value="dipendenti">Dipendenti</TabsTrigger>
          <TabsTrigger value="orari">Orari</TabsTrigger>
          <TabsTrigger value="festivi">Festivi e chiusure</TabsTrigger>
        </TabsList>
        <TabsContent value="dipendenti" className="text-sm">Chi lavora in negozio.</TabsContent>
        <TabsContent value="orari" className="text-sm">Le fasce della giornata.</TabsContent>
        <TabsContent value="festivi" className="text-sm">I giorni speciali.</TabsContent>
      </Tabs>
    </div>
  ),
  ...TELEFONO,
};

/**
 * Le due varianti e quando usarle (issue #118):
 * - `segmented`, la pillola: viste dello stesso contenuto o filtri;
 * - `underline`, la sottolineatura: sezioni diverse di una pagina.
 */
export const Varianti: Story = {
  render: () => (
    <div className="w-[28rem] space-y-8">
      <Tabs defaultValue="6">
        <TabsList aria-label="Periodo">
          <TabsTrigger value="3">3 mesi</TabsTrigger>
          <TabsTrigger value="6">6 mesi</TabsTrigger>
          <TabsTrigger value="12">12 mesi</TabsTrigger>
        </TabsList>
        <TabsContent value="3" className="text-sm">Gli ultimi 3 mesi.</TabsContent>
        <TabsContent value="6" className="text-sm">Gli ultimi 6 mesi.</TabsContent>
        <TabsContent value="12" className="text-sm">Gli ultimi 12 mesi.</TabsContent>
      </Tabs>
      <Tabs defaultValue="orari">
        <TabsList variant="underline" aria-label="Impostazioni">
          <TabsTrigger value="dipendenti">Dipendenti</TabsTrigger>
          <TabsTrigger value="orari">Orari</TabsTrigger>
          <TabsTrigger value="festivi">Festivi</TabsTrigger>
        </TabsList>
        <TabsContent value="dipendenti" className="text-sm">Chi lavora in negozio.</TabsContent>
        <TabsContent value="orari" className="text-sm">Le fasce della giornata.</TabsContent>
        <TabsContent value="festivi" className="text-sm">I giorni speciali.</TabsContent>
      </Tabs>
    </div>
  ),
};

const giorni = [
  { id: "lunedi", nome: "Lunedì" },
  { id: "martedi", nome: "Martedì" },
  { id: "mercoledi", nome: "Mercoledì", diverso: true },
  { id: "giovedi", nome: "Giovedì" },
  { id: "venerdi", nome: "Venerdì" },
  { id: "sabato", nome: "Sabato", diverso: true },
  { id: "domenica", nome: "Domenica", separato: true },
  { id: "festivi", nome: "Festivi" },
];

export const Verticale: Story = {
  render: () => (
    <div className="w-full max-w-xl bg-muted p-4">
      <Tabs orientation="vertical" defaultValue="mercoledi" className="flex items-start gap-4">
        <TabsList aria-label="Giorno" className="shrink-0">
          {giorni.map(({ id, nome, diverso, separato }) => (
            <TabsTrigger key={id} value={id} className={separato ? "mt-2.5" : undefined}>
              {nome}
              {diverso && (
                <>
                  <span aria-hidden="true" className="size-1.5 bg-primary" />
                  <span className="sr-only">orari diversi dal lunedì</span>
                </>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {giorni.map(({ id, nome }) => (
          <TabsContent key={id} value={id} className="mt-0 flex-1 bg-card p-4 text-sm">
            <h2 className="mb-2 font-semibold">{nome}</h2>
            <p>Mattina · 7.30–13.00</p>
            <p>Pomeriggio · {id === "mercoledi" ? "15.30–20.00" : "15.00–20.00"}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
};
