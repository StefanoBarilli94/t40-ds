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
        order: [
          "Introduzione",
          "Fondamenta",
          ["Colori", "Typography"],
          "Atoms",
          ["Panoramica"],
          "Form",
          ["Panoramica"],
          "Patterns",
          ["Panoramica"],
          "*",
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Tema",
      description: "Tema di brand (gt40 = default, ast40 = rosso, ft40 = rosa secondario)",
      defaultValue: "gt40",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "gt40", title: "GT40 (default)" },
          { value: "ast40", title: "AST40 (rosso)" },
          { value: "ft40", title: "FT40 (rosa secondario)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        data-theme={context.globals.theme === "ast40" || context.globals.theme === "ft40" ? context.globals.theme : undefined}
        className={context.parameters.layout === "fullscreen" ? "bg-background text-foreground" : "bg-background p-6 text-foreground"}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
