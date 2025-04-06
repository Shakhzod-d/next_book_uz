"use client";

import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const getFallbackLng = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("i18nextLng") || "uz";
  }
  return "uz";
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: getFallbackLng(),
    debug: false,
    returnNull: false,

    detection: {
      order: ["localStorage", "cookie", "queryString", "navigator"],
      caches: ["localStorage", "cookie"],
    },

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
