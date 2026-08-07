import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "../atoms/button";

const meta = {
  title: "Patterns/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`CardTitle`/`CardDescription` sono semplici `<div>` stilizzati, non intestazioni semantiche (`h1..h6`): se la card introduce una sezione della pagina, avvolgere il testo in un tag di intestazione appropriato passandolo come `asChild`-style o children con `<h2>`.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          <h2 className="text-base font-semibold">Riepilogo Agosto</h2>
        </CardTitle>
        <CardDescription>Aggio e spese del mese corrente</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Aggio: 3.845,85 €</p>
        <p>Spese: 9.088,08 €</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Vedi dettaglio</Button>
      </CardFooter>
    </Card>
  ),
};
