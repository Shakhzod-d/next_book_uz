"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataNotFound, Pagination } from "@/components";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { INews } from "@/types/common";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { NewsCard, Sorting } from "../components";
import { NewsStyled } from "./News.style";

const News = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const queryString = search ? `?${search}` : "";

  React.useEffect(() => {
    scrollToDefault();
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get("/news" + queryString);
      return response;
    } catch (err) {
      throw err;
    }
  };

  function newPath(news: INews) {
    if (news.type === "news") {
      return `/news/${news?.link || news._id}`;
    } else
      return `/books/details/${
        news?.book?.link ? news?.book?.link : news?.book?._id
      }`;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["news", search],
    queryFn: getNews,
  });

  const skleton = React.useMemo(() => {
    return new Array(12).fill("").map((_, i) => (
      <Grid item lg={3} sm={6} xs={12} key={i}>
        <Skeleton
          key={"news-key-" + i + 1}
          variant="rectangular"
          height="232px"
          sx={{ borderRadius: "8px" }}
        />
      </Grid>
    ));
  }, []);

  return (
    <NewsStyled className="container">
      <div className="d-flex align-items-center mb-3">
        <h1 className="page-title font-700 me-4">{t("NEWS.NEWS")}</h1>
        <Sorting />
      </div>
      <Grid container spacing={3}>
        {isLoading ? (
          skleton
        ) : get(data, "data.data.data.length") !== 0 ? (
          get(data, "data.data.data", []).map((news: INews) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={news._id}>
              <div
                style={{ cursor: "pointer" }}
                // onClick={() => navigate(newPath(news))} //MUST CHECK
                onClick={() => router.push(newPath(news))}
              >
                <NewsCard {...{ news }} />
              </div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} key="Not-found">
            <DataNotFound title="NEWS.NO_NEWS" />
          </Grid>
        )}
      </Grid>
      <div className="d-flex justify-content-center">
        <Pagination className="pt-5" total={get(data, "data.data.total", 0)} />
      </div>
    </NewsStyled>
  );
};

export default News;
