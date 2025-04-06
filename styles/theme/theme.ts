// @ts-nocheck
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#171717",
      contrastText: "#FFFFFF",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },

    primary: {
      light: "rgba(16, 127, 228, 0.1)",
      main: "#107FE4",
      contrastText: "#FFFFFF",
    },
    error: {
      light: "#EA5252",
      main: "#E72F2F",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#FFFFFF",
      contrastText: "#000",
    },
    background: {
      lightAlternative: "#C0DDFF",
      default: "#fff",
      paper: "#F0F0F0",
      light: "#F6F6F6",
      warning: "rgba(239, 127, 26, 0.2)",
      b1b1: "#B1B1B1",
      warningWhite: "#fff",
      info: "#fff",
      whiteInfo: "#fff",
      commitBox: "#f9f9f9",
    },
    text: {
      main: "#000",
      primary: "#1E1E1E",
      secondary: "#5E5E5E",
      disabled: "#EF7F1A",
      info: "#107FE4",
      grey: "#6A6A6A",
      white: "#fff",
      infoDark: "#005BAE",
      black: "#000",
      8282: "#828282",
      warning: "#EF7F1A",
      error: "#EA5252",
      5656: "#565656",
      light5e: "#5e5e5e",
    },

    warning: {
      200: "#FCE5D1",
      300: "rgba(214, 88, 17, 0.1)",
      light: "#FFD8B6",
      main: "#EF7F1A",
      contrastText: "#FFFFFF",
    },

    border: {
      grey: "#D9D9D9",
      warning: "#EF7F1A",
    },

    active: {
      warning: "#EF7F1A",
      info: "#107FE4",
    },

    grey: {
      100: "#E7E7E7",
      200: "#F6F6F6",
      300: "rgba(255, 255, 255, 0.8)",
      400: "#6A6A6A",
      500: "#989898",
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
