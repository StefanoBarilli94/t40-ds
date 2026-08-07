import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";

// Niente `component: Form` in meta: Form è un context provider (FormProvider)
// il cui tipo di props è l'intero ritorno di useForm — non ha senso pilotarlo
// via Controls, e costringerebbe ogni story a fabbricare un UseFormReturn finto.
const meta = {
  title: "Componenti/Form",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper su react-hook-form. `FormLabel` è collegata via `htmlFor` all'id generato da `FormControl`, e `FormMessage` viene collegato al campo con `aria-describedby` + annunciato come errore solo quando c'è un messaggio — niente `aria-describedby` puntato a un elemento vuoto.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  importo: z.coerce.number().min(0.01, "L'importo deve essere maggiore di zero"),
});

function EsempioForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { importo: 0 },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="grid w-72 gap-4">
        <FormField
          control={form.control}
          name="importo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importo</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0,00" {...field} />
              </FormControl>
              <FormDescription>Inserisci l'importo in euro.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Aggiungi</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <EsempioForm />,
};
