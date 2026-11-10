import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, CalendarDays, ChartNoAxesCombined, ClipboardList, House, User } from "lucide-react";

import { TopNav, TopNavBadge, TopNavBrand, TopNavEnd, TopNavItem } from "./top-nav";

const meta = {
  title: "Patterns/TopNav",
  component: TopNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Navigazione in alto su computer. Sotto md la barra è nascosta, perciò la prova più stretta è a 768 px. Avvolgi il testo delle voci in uno span per farlo accorciare e usa asChild per passare il collegamento dell'app. Il contatore aggiunge al nome della voce un testo come «3 da leggere».",
      },
    },
  },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

function Esempio({ attiva = false, avvisi = false }: { attiva?: boolean; avvisi?: boolean }) {
  return (
    <TopNav>
      <TopNavBrand><a href="#inizio" className="px-2 py-1 text-sm font-semibold">FT4.0</a></TopNavBrand>
      <TopNavItem asChild>
        <a href="#riepilogo"><House aria-hidden="true" /><span>Riepilogo</span></a>
      </TopNavItem>
      <TopNavItem asChild isActive={attiva}>
        <a href="#turni"><CalendarDays aria-hidden="true" /><span>Turni</span></a>
      </TopNavItem>
      <TopNavItem asChild>
        <a href="#richieste">
          <ClipboardList aria-hidden="true" />
          <span>Richieste</span>
          {avvisi && <TopNavBadge label="3 da leggere">3</TopNavBadge>}
        </a>
      </TopNavItem>
      <TopNavItem asChild>
        <a href="#andamento"><ChartNoAxesCombined aria-hidden="true" /><span>Andamento</span></a>
      </TopNavItem>
      <TopNavEnd>
        <TopNavItem asChild>
          <a href="#avvisi" aria-label="Avvisi"><Bell aria-hidden="true" /></a>
        </TopNavItem>
        <TopNavItem asChild>
          <a href="#profilo"><User aria-hidden="true" /><span>Monica</span></a>
        </TopNavItem>
      </TopNavEnd>
    </TopNav>
  );
}

export const QuattroVoci: Story = { name: "Quattro voci", render: () => <Esempio /> };
export const ConContatore: Story = { name: "Con contatore", render: () => <Esempio avvisi /> };
export const VoceAttiva: Story = { name: "Voce attiva", render: () => <Esempio attiva /> };
export const A768Px: Story = {
  name: "A 768 px",
  parameters: { viewport: { options: { computer: { name: "Computer 768", styles: { width: "768px", height: "600px" } } } } },
  globals: { viewport: { value: "computer", isRotated: false } },
  render: () => <Esempio attiva avvisi />,
};
export const TemaScuro: Story = {
  name: "Tema scuro",
  render: () => <div className="dark bg-background text-foreground"><Esempio attiva avvisi /></div>,
};
