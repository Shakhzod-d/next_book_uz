"use client";

import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { Button } from "@/components";
import { useTranslation } from "react-i18next";
import { NewsContainer } from "./News.style";
import Link from "next/link";
import axios from "axios";
import get from "lodash.get";
import { useQuery } from "@tanstack/react-query";
import { INews } from "@/types/common";
import { useRouter } from "next/navigation";
import { NewsCard } from "@/app/news/components";
// import { NEWS } from "@/contants/storage";

const News = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const getNews = async () => {
    try {
      const response = await axios.get("/news?page=1&limit=4");
      return response;
    } catch (err) {
      throw err;
    }
  };

  function formatToSlug(input: string): string {
    const uzbekReplacements: Record<string, string> = {
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      ʻ: "",
      "G‘": "G",
      "g‘": "g",
      "O‘": "O",
      "o‘": "o",
    };

    let result = input;
    for (const [key, value] of Object.entries(uzbekReplacements)) {
      result = result.split(key).join(value);
    }

    return result
      .replace(/["]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  function newPath(news: INews) {
    if (news.type === "news") {
      return `/news/${news.link}`;
    } else
      return `/books/details/${
        news?.book?.link ? news?.book?.link : news?.book?._id
      }`;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["some/news"],
    queryFn: getNews,
  });

  const skleton = React.useMemo(() => {
    return new Array(4).fill("").map((_, index) => (
      <Grid item lg={3} key={"news-skleton" + index}>
        <Skeleton
          variant="rectangular"
          height="232px"
          sx={{ borderRadius: "8px" }}
        />
      </Grid>
    ));
  }, []);

  return (
    <NewsContainer className="container pt-4 mb-5 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="news-title">{t("HOME.NEWS")}</h1>
        <Link href={"/news?page=1&limit=12"}>
          <Button variant="contained" color="warning" value="Yangiliklar">
            {t("HOME.ALL_NEWS")}
          </Button>
        </Link>
      </div>

      <Grid container spacing={3}>
        {isLoading
          ? skleton
          : get(data, "data.data.data", []).map((news: INews) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={news._id}>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={() => navigate(newPath(news), { state: news._id })}
                  // {/* MUST CHECK LATER */}
                  onClick={() => router.push(newPath(news))}
                >
                  <NewsCard {...{ news }} />
                </div>
              </Grid>
            ))}
      </Grid>
    </NewsContainer>
  );
};

export default News;
