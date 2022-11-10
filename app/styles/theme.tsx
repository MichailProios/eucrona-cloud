import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    "50": "#f0f9fe",
    "100": "#c3e5fb",
    "200": "#8dcdf7",
    "300": "#45aef2",
    "400": "#349cde",
    "500": "#2c83bb",
    "600": "#256f9e",
    "700": "#1e597f",
    "800": "#194b6b",
    "900": "#12364d",
  },
};

const breakpoints = {
  xs: "20em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const config = {
  initialColorMode: "light",
};

const components = {};

const theme = extendTheme({ config, colors, components, breakpoints });

export default theme;
