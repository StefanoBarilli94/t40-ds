import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const meta = {
  title: "Patterns/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "I bottoni Precedente/Successivo hanno già un `sr-only` con l'etichetta testuale (\"Previous slide\"/\"Next slide\"); la trascinabilità con il mouse è affiancata dalla navigazione da tastiera sui bottoni. `CarouselPrevious`/`CarouselNext` sono bottoni normali nel flusso (non `absolute` con offset negativo): vanno messi dentro `CarouselControls`, una barra centrata sotto `CarouselContent` — mai in overlay sopra la card attiva, a nessuna larghezza di viewport (issue #8).",
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
      <CarouselControls>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselControls>
    </Carousel>
  ),
};

export const ViewportStretto: Story = {
  name: "Viewport stretto",
  parameters: {
    docs: {
      description: {
        story:
          "Stesso Carousel della story Default, dentro un contenitore di 220px (più stretto di una colonna mobile tipica) — la barra controlli resta sotto il contenuto, mai sovrapposta, perché non dipende da un margine esterno per non essere tagliata.",
      },
    },
  },
  render: () => (
    <div className="w-[220px] border border-dashed border-border p-2">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3].map((n) => (
            <CarouselItem key={n}>
              <div className="flex h-32 items-center justify-center rounded-md bg-muted text-2xl font-semibold text-muted-foreground">
                {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselControls>
          <CarouselPrevious />
          <CarouselNext />
        </CarouselControls>
      </Carousel>
    </div>
  ),
};
