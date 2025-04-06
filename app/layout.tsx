"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useContext, useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LayoutContext } from "@/layout/context";
import { DarkTheme } from "@/styles/theme/DarkTheme";
import { LightTheme } from "@/styles/theme/LightTheme";
import { Footer, Navbar, ScrollToTop } from "@/components";
import Auth from "@/components/shared/Auth/container/Auth";
import i18n from "../lib/i18n";

import { QueryProvider } from "./QueryProvider";
import { CssBaseline } from "@mui/material";
import BookmarkListProvider from "./bookmark/context/BookmarkListProvider";
import BookListProvider from "./books/bookList/context/BookListProvider";
import BookDetailsProvider from "./books/details/context/BookDetailsProvider";
import HomeProvider from "./context/HomeProvider";
import NewsProvider from "./news/details/context/NewsProvider";
import PublishingProvider from "./publishing/context/PublishingProvider";
import ProfileProvider from "./profile/context/ProfileProvider";
import BasketDetailsProvider from "./cart/context/BasketProvider";
import CheckoutProvider from "./cart/checkout/context/CheckoutProvider";
import ShoppingCardListProvider from "./cart/shoppingCardList/context/ShoppingCardListProvider";
import SuccessfulProvider from "./cart/successful/context/SuccessfulProvider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/index.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "@/layout/context/LayoutProvider";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    state: { mode },
  } = useContext(LayoutContext);

  const theme = useMemo(
    () => (mode === "dark" ? DarkTheme : LightTheme),
    [mode]
  );

  useEffect(() => {
    const body = document.body;
    if (mode === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }
  }, [mode]);

  return (
    <html lang={i18n.language || "uz"}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="40x35" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="facebook-domain-verification"
          content="be1efv9z1e7sdokw9wqbk3zgumqlof"
        />
        <link rel="author" href="https://book.uz" />
        <meta
          name="author"
          content="Azim Umarov (https://github.com/azimumarov)"
        />
        <meta
          name="author"
          content="Shakhzod Jumaev (https://github.com/Shakhzod-d)"
        />
        <Head>
          <title>Book.uz - Kitob eng yaxshi sovg'a</title>
          <meta
            name="description"
            content="📚 Keng tanlov; 💰 Eng arzon narxlar; 🚚 Tezkor va xavfsiz yetkazib berish. 📦 Kitoblar katalogi va buyurtma"
          />
        </Head>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutProvider>
          <HomeProvider>
            <BookmarkListProvider>
              <BookListProvider>
                <BookDetailsProvider>
                  <NewsProvider>
                    <PublishingProvider>
                      <ProfileProvider>
                        <BasketDetailsProvider>
                          <CheckoutProvider>
                            <ShoppingCardListProvider>
                              <SuccessfulProvider>
                                <ThemeProvider theme={theme}>
                                  <QueryProvider>
                                    <CssBaseline />
                                    <Auth />
                                    <Navbar />
                                    {children}
                                    <Footer />
                                    <Toaster
                                      containerStyle={{ zIndex: "100000" }}
                                    />
                                    <ScrollToTop />
                                  </QueryProvider>
                                </ThemeProvider>
                              </SuccessfulProvider>
                            </ShoppingCardListProvider>
                          </CheckoutProvider>
                        </BasketDetailsProvider>
                      </ProfileProvider>
                    </PublishingProvider>
                  </NewsProvider>
                </BookDetailsProvider>
              </BookListProvider>
            </BookmarkListProvider>
          </HomeProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
