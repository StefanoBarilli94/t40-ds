import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Componenti/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Placeholder di caricamento. Il contenitore che lo usa dovrebbe avere `aria-busy=\"true\"` e un testo per screen reader (es. \"Caricamento in corso\") tramite `sr-only`, così chi non vede l'animazione sa comunque che sta caricando.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const CardDiCaricamento: Story = {
  name: "Card in caricamento",
  render: () => (
    <div role="status" aria-busy="true" className="w-72 space-y-3">
      <span className="sr-only">Caricamento dati in corso</span>
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};
