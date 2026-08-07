import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail the Vitest/CI run on accessibility violations instead of just
      // flagging them in the panel — components must pass WCAG 2.1 AA.
      test: "error",
    },
    options: {
      storySort: {
        order: ["Introduzione", "Fondamenta", "Componenti", "*"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background p-6 text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default preview;
