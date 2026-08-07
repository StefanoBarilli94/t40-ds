import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../atoms/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "Patterns/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pannello laterale (usa lo stesso primitivo di Dialog: focus trap, `SheetTitle` obbligatorio, Esc per chiudere). `side` (`top`/`right`/`bottom`/`left`, default `right`) è una prop di `SheetContent`, non di `Sheet` — vedi le story dedicate per ogni lato qui sotto.",
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DaDestra: Story = {
  name: "Da destra (default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri filtri</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtri</SheetTitle>
          <SheetDescription>Restringi i risultati per categoria e periodo.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Applica</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const DallAlto: Story = {
  name: "Dall'alto",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri notifiche</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notifiche</SheetTitle>
          <SheetDescription>Le ultime 3 voci registrate.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const DalBasso: Story = {
  name: "Dal basso",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri azioni rapide</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Azioni rapide</SheetTitle>
          <SheetDescription>Scegli un'azione per la voce selezionata.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Chiudi</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const DaSinistra: Story = {
  name: "Da sinistra",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigazione principale.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
