import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePlus2, History, LayoutDashboard, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";

const meta = {
  title: "Patterns/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Navigazione principale dell'app (replica la sidebar scura di ast40/gt40). `SidebarTrigger` ha già `aria-label=\"Toggle Sidebar\"`; ogni voce attiva usa `data-active` per lo stato visivo, non solo il colore, e resta un `<a>`/`<button>` reale navigabile da tastiera. Il logo in `SidebarHeader` (issue #13) usa `/brand/logo-dark.png`: il suo sfondo quasi nero si fonde con `--sidebar` (`oklch(0.18 0.025 250)`, condiviso tra i due temi — `--sidebar` non viene mai sovrascritto da AST40, vedi theming.md) in entrambi i temi. **Limite noto**: `logo-light.png` (marchio rosso, usato per il branding AST40 altrove) ha uno sfondo chiaro cotto nell'immagine — mostrarlo qui creerebbe un riquadro chiaro stonato su uno sfondo sempre scuro. Per uno swap del logo per-tema in Sidebar serve una variante del marchio rosso con sfondo trasparente (o `oklch(0.18 0.025 250)`), non ancora disponibile come asset.",
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex-row items-center gap-2 p-4 text-sm font-semibold text-sidebar-foreground">
          <img src="/brand/logo-dark.png" alt="" className="h-8 w-8 shrink-0 object-cover" />
          AST4.0
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FilePlus2 />
                  <span>Inserimento</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <History />
                  <span>Storico</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Configurazioni voci</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-2 border-b p-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </header>
        <div className="p-6 text-sm text-muted-foreground">Contenuto della pagina…</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const VariantiMenuButton: Story = {
  name: "SidebarMenuButton: variant, size, isActive",
  parameters: {
    docs: {
      description: {
        story:
          "`variant` (`default`/`outline`), `size` (`default`/`sm`/`lg`) e `isActive` sono prop di `SidebarMenuButton`, non di `Sidebar` — qui mostrate fianco a fianco.",
      },
    },
  },
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="sm">
                  <LayoutDashboard />
                  <span>size=&quot;sm&quot;</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="default">
                  <LayoutDashboard />
                  <span>size=&quot;default&quot;</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <LayoutDashboard />
                  <span>size=&quot;lg&quot;</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline">
                  <Settings />
                  <span>variant=&quot;outline&quot;</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <FilePlus2 />
                  <span>isActive=&#123;true&#125;</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <History />
                  <span>disabled</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-6 text-sm text-muted-foreground">Contenuto della pagina…</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
