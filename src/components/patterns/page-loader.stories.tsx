import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageLoader } from "./page-loader";

const meta = {
  title: "Patterns/PageLoader",
  component: PageLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Schermata di caricamento a pagina intera, per l'attesa senza durata nota (sessione in verifica, route guard) — non per il caricamento di una sezione dentro una pagina già visibile, dove un `Skeleton` locale è meno invasivo. Il logo arriva come slot: il DS applica solo il tema, ogni app porta il proprio asset.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

function PlaceholderLogo() {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
    >
      T4
    </div>
  );
}

export const Default: Story = {
  render: () => <PageLoader logo={<PlaceholderLogo />} />,
};

export const SenzaLogo: Story = {
  render: () => <PageLoader />,
};

export const MessaggioPersonalizzato: Story = {
  render: () => <PageLoader logo={<PlaceholderLogo />} message="Verifica della sessione…" />,
};

export const SuSfondoScuro: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`inverted`, per un genitore con sfondo scuro/fotografico (una hero image, non `bg-background`): testo e barra passano al bianco. Misurato su un caso reale (ast40, pagina di login): i token neutri di default erano a 1.6:1 di contrasto contro la foto, ben sotto soglia AA — non una scelta estetica, una correzione.",
      },
    },
  },
  render: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #3a4a5c 0%, #1a1a1a 60%, #0a0a0a 100%)",
      }}
    >
      <PageLoader logo={<PlaceholderLogo />} inverted className="bg-transparent" />
    </div>
  ),
};
