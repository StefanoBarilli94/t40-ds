import { defineConfig } from "vitest/config";

/**
 * Test unitari della logica pura del pacchetto — non dei componenti resi.
 *
 * Il rendering è già coperto da Storybook (e dall'audit `bun run a11y`); qui
 * stanno le funzioni che sbagliano in silenzio, tipo il parsing degli importi
 * del `CurrencyInput` (issue #64), dove un errore non si vede a schermo ma
 * finisce nel database.
 *
 * `environment: "node"`: nessuna di queste funzioni tocca il DOM. Se un
 * giorno servisse testare un componente, va aggiunto jsdom qui.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
