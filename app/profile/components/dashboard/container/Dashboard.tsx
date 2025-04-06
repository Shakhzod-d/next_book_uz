import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { INews } from "@/types/common";
import { PageTitle } from "../../orders/container/Orders.style";
import { NewsCard, Notifications } from "../components";
import { AllNewsButton } from "./Dashboard.style";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
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

  function newPath(news: INews) {
    if (news.type === "news") {
      return `/news/${news?.link || news._id}`;
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
    return new Array(4).fill("").map((_, idx) => (
      <Grid item lg={3} key={idx}>
        <Skeleton
          variant="rectangular"
          height="232px"
          sx={{ borderRadius: "8px" }}
        />
      </Grid>
    ));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <PageTitle>{t("PROFILE.NEWS")}</PageTitle>
        <Link href={"/news?page=1&limit=12"}>
          <AllNewsButton
            variant="contained"
            color="warning"
            value="Yangiliklar"
          >
            {t("HOME.ALL_NEWS")}
          </AllNewsButton>
        </Link>
      </div>

      <Grid container spacing={3}>
        {isLoading
          ? skleton
          : get(data, "data.data.data", []).map((news: INews) => (
              <Grid key={news._id} item lg={3} md={4} sm={6}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(newPath(news))}
                >
                  <NewsCard news={news} />
                </div>
              </Grid>
            ))}
      </Grid>
      <div className="pt-3">
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;
