import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../atoms/button";
import { Label } from "./label";
import { PasswordInput } from "./password-input";

const meta = {
  title: "Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Campo password con l'occhio per vederla mentre si scrive. Parte **nascosta**; il pulsante dentro il campo alterna «Mostra password» e «Nascondi password» (`aria-pressed`). È `type=\"button\"`: non invia il modulo, si raggiunge con Tab e si usa con Invio o Spazio. Cambia solo il tipo del campo, quindi il valore resta e `autoComplete` continua a guidare i gestori di password. Come `Input`, va sempre abbinato a una `Label`.",
      },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-72 max-w-full gap-1.5">
      <Label htmlFor="password-default">Password</Label>
      <PasswordInput id="password-default" autoComplete="current-password" defaultValue="Segreta123" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByLabelText("Password");
    const occhio = canvas.getByRole("button", { name: "Mostra password" });
    await expect(campo).toHaveAttribute("type", "password");
    await userEvent.click(occhio);
    await expect(campo).toHaveAttribute("type", "text");
    await expect(campo).toHaveValue("Segreta123");
    await expect(canvas.getByRole("button", { name: "Nascondi password" })).toHaveAttribute("aria-pressed", "true");
  },
};

export const ConErrore: Story = {
  name: "Con errore",
  render: () => (
    <div className="grid w-72 max-w-full gap-1.5">
      <Label htmlFor="password-errore">Password</Label>
      <PasswordInput id="password-errore" aria-invalid aria-describedby="password-errore-testo" />
      <p id="password-errore-testo" className="text-sm text-destructive">
        Scrivi la password.
      </p>
    </div>
  ),
};

export const Disabilitato: Story = {
  render: () => (
    <div className="grid w-72 max-w-full gap-1.5">
      <Label htmlFor="password-spento">Password</Label>
      <PasswordInput id="password-spento" disabled defaultValue="Segreta123" />
    </div>
  ),
};

/** Dentro un modulo: l'occhio non lo invia, solo il pulsante Accedi. */
export const NelModulo: Story = {
  name: "Nel modulo di accesso",
  render: () => (
    <form
      className="grid w-80 max-w-full gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.dataset.inviato = "sì";
      }}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="password-modulo">Password</Label>
        <PasswordInput id="password-modulo" autoComplete="current-password" />
      </div>
      <Button type="submit">Accedi</Button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Password"), "abc");
    await userEvent.click(canvas.getByRole("button", { name: "Mostra password" }));
    await expect(canvasElement.querySelector("form")?.dataset.inviato).toBeUndefined();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByLabelText("Password")).toHaveAttribute("type", "password");
    await expect(canvasElement.querySelector("form")?.dataset.inviato).toBeUndefined();
  },
};
