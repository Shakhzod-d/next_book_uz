"use client";

import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import get from "lodash.get";
import { PublishingCard } from "../components";
import { PublishingContext } from "../context";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { PUBLISHING_LIST_LIMIT } from "../constants/PublishingList";
import { InfiniteScrollLoader, Loader } from "@/components";
import { MainContent } from "@/app/style/home";
import InfiniteScroll from "react-infinite-scroll-component";

const PublishingList = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(PUBLISHING_LIST_LIMIT);
  const {
    state: {
      getPublishingState: { getPublishingResponse, getPublishingStatus },
    },
    actions: { getPublishing },
  } = useContext(PublishingContext);

  useEffect(() => {
    getPublishing();
  }, []);

  const fetchMoreData = () => {
    setLimit((prev) => prev + PUBLISHING_LIST_LIMIT);
    getPublishing(limit + PUBLISHING_LIST_LIMIT);
  };

  const publishingCardClick = async (id: string) => {
    if (id) {
      navigate({
        pathname: "/books",
        search: `&publisherIds=${id}`,
      });
    }
  };

  if (
    (getPublishingStatus === REQUEST_STATUS.loading ||
      getPublishingStatus === REQUEST_STATUS.initial) &&
    PUBLISHING_LIST_LIMIT === limit
  )
    return <Loader />;

  return (
    <MainContent className="container " id="authorContent">
      {/* @ts-ignore */}
      <InfiniteScroll
        dataLength={
          getPublishingStatus === REQUEST_STATUS.success &&
          get(getPublishingResponse, "data.data.length")
        }
        next={fetchMoreData}
        hasMore={
          getPublishingStatus === REQUEST_STATUS.success
            ? get(getPublishingResponse, "data.data.length") !==
              get(getPublishingResponse, "data.total")
            : false
        }
        loader={<InfiniteScrollLoader />}
        scrollThreshold="authorContent"
      >
        <Grid
          container
          px={{
            xs: 1,
          }}
          spacing={{ xs: 1, sm: 2, lg: 4, xl: 5 }}
          className="pb-5"
        >
          {get(getPublishingResponse, "data.data")?.map((item: any) => (
            <Grid item xs={6} sm={3.8} md={3} lg={2}>
              <Box
                justifyContent={{
                  sm: "space-around",
                  md: "space-around",
                  lg: "space-around",
                  xl: "start",
                }}
              >
                <a
                  className="hover pb-4"
                  onClick={() => publishingCardClick(item._id)}
                >
                  <PublishingCard publishing={item} />
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </MainContent>
  );
};

export default PublishingList;
