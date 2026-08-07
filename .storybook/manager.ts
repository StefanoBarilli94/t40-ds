import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "T40 DS",
    brandUrl: "?path=/docs/introduzione--docs",
    brandImage: "/brand/logo-dark.png",
    brandTarget: "_self",
  }),
});
