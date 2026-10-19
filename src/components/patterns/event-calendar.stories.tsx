import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback } from "../atoms/avatar";
import { EventCalendar, type EventCalendarEvent } from "./event-calendar";

const meta = {
  title: "Patterns/EventCalendar",
  component: EventCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof EventCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const faccia = (iniziali: string) => (
  <Avatar size="sm" className="size-4 text-[8px]">
    <AvatarFallback>{iniziali}</AvatarFallback>
  </Avatar>
);

// Le assenze di FT4.0 attorno alla richiesta di Paola, 26–30 ottobre 2026.
const ASSENZE: EventCalendarEvent[] = [
  { id: "r", start: "2026-10-26", end: "2026-10-30", label: "Paola", leading: faccia("PT"), tone: "primary", variant: "outline", description: "Paola, questa richiesta" },
  { id: "1", start: "2026-10-28", end: "2026-11-03", label: "Monica", leading: faccia("MF"), tone: "positive", description: "Monica, in ferie" },
  { id: "2", start: "2026-10-27", end: "2026-10-28", label: "Ilaria", leading: faccia("IC"), tone: "negative", description: "Ilaria, malattia" },
  { id: "3", start: "2026-10-24", end: "2026-10-24", label: "Ilaria", leading: faccia("IC"), tone: "neutral", description: "Ilaria, riposo" },
  { id: "4", start: "2026-10-25", end: "2026-10-25", label: "Ilaria", leading: faccia("IC"), tone: "positive", description: "Ilaria, in ferie" },
  { id: "5", start: "2026-11-02", end: "2026-11-06", label: "Ilaria", leading: faccia("IC"), tone: "warning", description: "Ilaria, ferie da decidere" },
  { id: "6", start: "2026-10-19", end: "2026-10-20", label: "Ilaria", leading: faccia("IC"), tone: "negative", description: "Ilaria, malattia" },
  { id: "7", start: "2026-10-20", end: "2026-10-20", label: "Andrea", leading: faccia("AL"), tone: "neutral", description: "Andrea, riposo" },
  { id: "8", start: "2026-10-29", end: "2026-10-29", label: "Andrea", leading: faccia("AL"), tone: "neutral", description: "Andrea, riposo" },
];

function Assenze() {
  const [mese, setMese] = React.useState("2026-10");
  const [scelto, setScelto] = React.useState("2026-10-28");
  return (
    <div className="w-[56rem] max-w-full">
      <EventCalendar
        month={mese}
        onMonthChange={setMese}
        events={ASSENZE}
        selected={scelto}
        onSelect={setScelto}
        today="2026-10-19"
        isDayMuted={(d) => d === "2026-11-01"}
      />
      <p className="mt-3 text-sm">Scelto: {scelto}</p>
    </div>
  );
}

export const Default: Story = {
  args: { month: "2026-10", onMonthChange: () => {}, events: [] },
  render: () => <Assenze />,
  parameters: {
    docs: {
      description: {
        story:
          "Le assenze di FT4.0 attorno a una richiesta di ferie: la richiesta a contorno, ferie, ferie da decidere, malattia e riposi come barre che attraversano i giorni e vanno a capo. Il 28 si vede che mancano in tre senza toccarlo. Tab entra nel mese, le frecce si muovono, Invio sceglie; ogni giorno dice a parole chi manca.",
      },
    },
  },
};

function Pieno() {
  const [mese, setMese] = React.useState("2026-10");
  const tanti = ["A", "B", "C", "D", "E"].map((n, i) => ({
    id: n, start: "2026-10-12", end: `2026-10-1${4 + i}`, label: `Persona ${n}`, tone: "positive" as const, description: `Persona ${n}, in ferie`,
  }));
  return (
    <div className="w-[56rem] max-w-full">
      <EventCalendar month={mese} onMonthChange={setMese} events={tanti} maxLanes={3} />
    </div>
  );
}

export const TroppiEventi: Story = {
  args: { month: "2026-10", onMonthChange: () => {}, events: [] },
  render: () => <Pieno />,
  parameters: { docs: { description: { story: "Oltre tre barre per giorno, il giorno dice \"+N altri\"; a parole li dice tutti." } } },
};
