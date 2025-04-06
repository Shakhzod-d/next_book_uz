"use client";

import { useEffect, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { LayoutContext } from "@/layout/context";
import { DarkTheme } from "@/styles/theme/DarkTheme";
import { LightTheme } from "@/styles/theme/LightTheme";
import { AppStyled } from "@/app/App.style";
import Layout from "@/layout/container/Layout";

const ThemeWrapper = () => {
  const {
    state: { mode },
  } = useContext(LayoutContext);

  const theme = useMemo(
    () => (mode === "dark" ? DarkTheme : LightTheme),
    [mode]
  );

  useEffect(() => {
    // if (typeof window !== "undefined") {
    document.body.classList.toggle("dark", mode === "dark");
    document.body.classList.toggle("light", mode !== "dark");
    // }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppStyled>
        <Layout />
        <Toaster containerStyle={{ zIndex: 100000 }} />
      </AppStyled>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
