"use client";

import { useParams } from "next/navigation";
import NewsDetails from "../details/container/NewsDetails";
import { NewsContext } from "../details/context";
import { useNews } from "../details/context/useNews";

export default function NewsArticlePage() {
  const params = useParams();
  const { slug } = params;

  return (
    <NewsContext.Provider value={useNews()}>
      <NewsDetails slug={slug} />;
    </NewsContext.Provider>
  );
}
