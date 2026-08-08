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
          "Navigazione principale dell'app (replica la sidebar scura di ast40/gt40). `SidebarTrigger` ha già `aria-label=\"Toggle Sidebar\"`; ogni voce attiva usa `data-active` per lo stato visivo, non solo il colore, e resta un `<a>`/`<button>` reale navigabile da tastiera. Il logo in `SidebarHeader` (issue #13) cambia per tema via CSS (selettore `[data-theme=ast40]`, stesso meccanismo del resto del theming — non serve leggere il tema a runtime): `logo-dark.png` (marchio ciano/bianco) di default, `logo-light.png` (marchio rosso, sfondo trasparente) sotto `data-theme=\"ast40\"`.",
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
          {/* Swap via CSS, non JS: stesso pattern data-theme del resto del
              theming (vedi agent_docs/theming.md), non serve leggere il tema
              a runtime. logo-light.png ora ha sfondo trasparente (issue #13,
              versione precedente aveva uno sfondo chiaro cotto nell'immagine
              — stonava su una sidebar sempre scura). */}
          <img
            src="/brand/logo-dark.png"
            alt=""
            className="block h-8 w-8 shrink-0 object-contain [[data-theme=ast40]_&]:hidden"
          />
          <img
            src="/brand/logo-light.png"
            alt=""
            className="hidden h-8 w-8 shrink-0 object-contain [[data-theme=ast40]_&]:block"
          />
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
