// @ts-nocheck
import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#031022",
      contrastText: "#FFFFFF",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },

    primary: {
      light: "#152642",
      main: "#107FE4",
      contrastText: "#FFFFFF",
    },
    error: {
      light: "#EA5252",
      main: "#E72F2F",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#107FE4",
      contrastText: "#000",
    },
    background: {
      lightAlternative: "#8AC7FF",
      default: "#081B33",
      paper: "#152642",
      light: "#152642",
      warning: "rgba(239, 127, 26, 0.2)",
      b1b1: "#B1B1B1",
      warningWhite: "#EF7F1A",
      info: "#1F365B",
      whiteInfo: "#152642",
      commitBox: "#031022",
    },
    text: {
      main: "#fff",
      primary: "#fff",
      secondary: "#a7a7a7",
      disabled: "#EF7F1A",
      info: "#107FE4",
      grey: "#fff",
      white: "#fff",
      infoDark: "#005BAE",
      black: "#fff",
      8282: "#a7a7a7",
      warning: "#EF7F1A",
      error: "#EA5252",
      5656: "#A7A7A7",
      light5e: "#fff",
    },

    warning: {
      200: "#FCE5D1",
      300: "#FFD7C1",
      light: "#081B33",
      main: "#EF7F1A",
      contrastText: "#FFFFFF",
    },

    border: {
      grey: "#D9D9D9",
      warning: "#EF7F1A",
    },

    active: {
      warning: "#EF7F1A",
      info: "#8AC7FF",
    },

    grey: {
      100: "#E7E7E7",
      200: "#F6F6F6",
      300: "rgba(255, 255, 255, 0.8)",
      400: "rgba(255, 255, 255, 0.8)",
      500: "#fff",
      600: "rgba(0, 0, 0, 0.1)",
      700: "#858997",
      main: "#C2C2C2",
      555: "#555",
    },
    divider: "#00B2F5",
  },
  shadows: [
    "none",
    "0px 4px 12px rgba(101, 171, 231, 0.12)",
    "0px 0px 16px rgba(0, 178, 245, 0.2)",
    "0px 0px 8px rgba(0, 178, 245, 0.16)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  shape: {
    borderRadius: 24,
  },
});
