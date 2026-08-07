import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

const meta = {
  title: "Patterns/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "I bottoni Precedente/Successivo hanno già un `sr-only` con l'etichetta testuale (\"Previous slide\"/\"Next slide\"); la trascinabilità con il mouse è affiancata dalla navigazione da tastiera sui bottoni.",
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-72">
      <CarouselContent>
        {[1, 2, 3].map((n) => (
          <CarouselItem key={n}>
            <div className="flex h-40 items-center justify-center rounded-md bg-muted text-2xl font-semibold text-muted-foreground">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
