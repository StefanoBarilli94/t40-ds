import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "Componenti/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`AvatarImage` richiede sempre un `alt` descrittivo (nome della persona); `AvatarFallback` mostra le iniziali quando l'immagine non carica ed è già testuale, quindi accessibile di default.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConImmagine: Story = {
  name: "Con immagine",
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Monica" />
      <AvatarFallback>MO</AvatarFallback>
    </Avatar>
  ),
};

export const SoloFallback: Story = {
  name: "Solo iniziali (fallback)",
  render: () => (
    <Avatar>
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
  ),
};

export const Gruppo: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="ring-2 ring-background">
        <AvatarFallback>MO</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback>PA</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback>IL</AvatarFallback>
      </Avatar>
    </div>
  ),
};
