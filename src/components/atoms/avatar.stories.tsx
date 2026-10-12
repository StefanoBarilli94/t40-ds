import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

/** Foto di prova generata qui, così la story non dipende da un servizio esterno. */
const foto = (colore: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${colore}"/><circle cx="40" cy="31" r="15" fill="#fff" fill-opacity=".85"/><path d="M10 80c0-18 13-29 30-29s30 11 30 29z" fill="#fff" fill-opacity=".85"/></svg>`,
  )}`;

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Foto tonda di una persona, con le iniziali quando la foto manca o non carica. `AvatarImage` richiede sempre un `alt` con il nome della persona. Se il nome è già scritto accanto, l'avatar è decorativo: `alt=\"\"` sulla foto e `aria-hidden` sulle iniziali, altrimenti uno screen reader lo legge due volte. Il tondo è un'eccezione dichiarata al reset degli angoli (`[data-slot=\"avatar\"]` in `src/index.css`).",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConFoto: Story = {
  name: "Con foto",
  render: () => (
    <Avatar>
      <AvatarImage src={foto("#0f766e")} alt="Monica" />
      <AvatarFallback>MO</AvatarFallback>
    </Avatar>
  ),
};

export const SoloIniziali: Story = {
  name: "Solo iniziali",
  render: () => (
    <Avatar>
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
  ),
};

export const FotoCheNonCarica: Story = {
  name: "Foto che non carica",
  parameters: {
    docs: {
      description: {
        story:
          "L'indirizzo della foto è sbagliato di proposito: restano le iniziali, senza l'icona di immagine rotta del browser.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src="/foto-che-non-esiste.jpg" alt="Paola" />
      <AvatarFallback>PA</AvatarFallback>
    </Avatar>
  ),
};

export const Dimensioni: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`sm` sta dentro una riga di testo o una fascia di turno, `md` è la misura di una voce d'elenco, `lg` quella di una scheda profilo.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Avatar key={`foto-${size}`} size={size}>
          <AvatarImage src={foto("#0f766e")} alt="Monica" />
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>
      ))}
      {(["sm", "md", "lg"] as const).map((size) => (
        <Avatar key={`iniziali-${size}`} size={size}>
          <AvatarFallback>IL</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const AccantoAlNome: Story = {
  name: "Accanto al nome",
  parameters: {
    docs: {
      description: {
        story:
          "Il caso più frequente: il nome è scritto accanto, quindi l'avatar è decorativo e non va letto una seconda volta.",
      },
    },
  },
  render: () => (
    <ul className="flex w-full max-w-64 flex-col gap-3">
      {[
        { nome: "Monica", colore: "#0f766e" },
        { nome: "Paola", colore: "#b45309" },
        { nome: "Ilaria", colore: null },
      ].map(({ nome, colore }) => (
        <li key={nome} className="flex items-center gap-3 text-sm">
          <Avatar size="sm">
            {colore && <AvatarImage src={foto(colore)} alt="" />}
            <AvatarFallback aria-hidden="true">{nome.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {nome}
        </li>
      ))}
    </ul>
  ),
};

export const Gruppo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Chi lavora in una fascia. Il contorno del colore di fondo separa gli avatar sovrapposti.",
      },
    },
  },
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="outline-2 outline-background">
        <AvatarImage src={foto("#0f766e")} alt="Monica" />
        <AvatarFallback>MO</AvatarFallback>
      </Avatar>
      <Avatar className="outline-2 outline-background">
        <AvatarImage src={foto("#b45309")} alt="Paola" />
        <AvatarFallback>PA</AvatarFallback>
      </Avatar>
      <Avatar className="outline-2 outline-background">
        <AvatarFallback>IL</AvatarFallback>
      </Avatar>
    </div>
  ),
};
