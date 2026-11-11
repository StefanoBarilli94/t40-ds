import { useId } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../atoms/button";
import { Input } from "../form/input";
import { Label } from "../form/label";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { LoginBackground } from "./login-background";

function SchedaAccesso() {
  const id = useId();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="text-sm text-muted-foreground">Tabaccheria 4.0</p>
        <CardTitle as="h2">Accedi</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-1.5">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input id={`${id}-email`} type="email" autoComplete="username" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input id={`${id}-password`} type="password" autoComplete="current-password" />
          </div>
          <Button type="submit" className="w-full">Accedi</Button>
        </form>
      </CardContent>
    </Card>
  );
}

const meta = {
  title: "Patterns/LoginBackground",
  component: LoginBackground,
  tags: ["autodocs"],
  args: { motif: "shifts", className: "p-4", children: <SchedaAccesso /> },
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        computer: { name: "Computer 1440", styles: { width: "1440px", height: "900px" } },
        telefono: { name: "Telefono 360", styles: { width: "360px", height: "740px" } },
      },
    },
    docs: {
      description: {
        component:
          "Sfondo a pagina intera per l'accesso. Il fondo usa il token `--sidebar` e il motivo decorativo usa `--primary` del tema. Passa la scheda come `children` e usa una superficie piena come `Card` per mantenere il contrasto di testo e campi.",
      },
    },
  },
} satisfies Meta<typeof LoginBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Turni: Story = { args: { motif: "shifts" } };
export const Cassa: Story = { args: { motif: "register" } };
export const Mesi: Story = { args: { motif: "months" } };
export const TemaAst40: Story = {
  args: { motif: "months" },
  render: (args) => <LoginBackground {...args} data-theme="ast40" />,
};
export const Telefono: Story = {
  globals: { viewport: { value: "telefono", isRotated: false } },
};
