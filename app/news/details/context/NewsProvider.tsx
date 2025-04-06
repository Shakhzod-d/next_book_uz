"use client";

import React from "react";
import NewsContext from "./NewsContext";
import { INewsProvider } from "./NewsContext.types";
import { useNews } from "./useNews";

const NewsProvider = ({ children }: INewsProvider) => {
  const value = useNews();
  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export default NewsProvider;
