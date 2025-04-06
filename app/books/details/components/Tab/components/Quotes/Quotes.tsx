"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import QuoteCard from "../QuoteCard/QuoteCard";
import { QuotesStyled } from "./Quotes.style";
import { DataNotFound } from "@/components";

const Quotes = () => {
  const { t } = useTranslation();
  return <DataNotFound title="BOOK_DETAILS.NO_QUOTES" />;
  return (
    <QuotesStyled className="p-3">
      <h2 className="mb-3">{t("BOOK_DETAILS.QUOTES")}</h2>
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
    </QuotesStyled>
  );
};

export default Quotes;
