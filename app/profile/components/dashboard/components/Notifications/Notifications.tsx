"use client";

import { Grid } from "@mui/material";
import { PageTitle } from "../../../orders/container/Orders.style";
import React from "react";
import { useTranslation } from "react-i18next";
import NotificationCard from "../NotificationCard/NotificationCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { IComment } from "@/components/common/CommentCard/Comment.types";

const getNotifications = async () => {
  try {
    return await axios.get("book/comment/mine?page=1&limit=500");
  } catch (err) {
    throw err;
  }
};

const Notifications = () => {
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ["getMineNotifications"],
    queryFn: getNotifications,
  });

  return (
    <div className=" mb-3">
      <PageTitle>{"Xabarlar"}</PageTitle>
      <Grid container spacing={3}>
        {get(data, "data.data", []).map((notification: IComment) => (
          <Grid item sm={6} key={notification._id}>
            <NotificationCard notification={notification} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notifications;
