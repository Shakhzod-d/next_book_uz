"use client";

import React from "react";
import NewsProvider from "../context/NewsProvider";
import NewsDetails from "./NewsDetails";

const index = () => {
  return (
    <NewsProvider>
      <NewsDetails />
    </NewsProvider>
  );
};

export default index;
