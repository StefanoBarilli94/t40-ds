import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "T40 DS",
    brandUrl: "https://github.com/StefanoBarilli94/t40-ds",
    brandImage: "/brand/logo-dark.png",
    brandTarget: "_blank",
  }),
});
