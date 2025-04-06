"use client";

import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LayoutContext } from "@/layout/context";
import { PageTitle, PageTitleSkleton, TabsStyled } from "./Orders.style";
import { Grid, Skeleton, Tab } from "@mui/material";
import { IOrder, TOrderStatus } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/api/client";
import get from "lodash.get";
import { Card } from "../components";
import { DataNotFound } from "@/components";
import Link from "next/link";

const Orders = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState<TOrderStatus | "all">("all");

  const {
    state: { user },
  } = useContext(LayoutContext);

  const statusQuery = React.useMemo(() => {
    if (tabValue === "all") return "";
    return `&status=${tabValue}`;
  }, [tabValue]);

  const getOrders = async () => {
    try {
      const response = await axiosInstance.get(
        `order?page=1&limit=150&userId=${get(user, "_id", "") + statusQuery}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getOrdersByUserId", tabValue],
    queryFn: getOrders,
  });

  const tabChange = (event: React.SyntheticEvent, newValue: TOrderStatus) => {
    setTabValue(newValue);
  };

  const skleton = React.useMemo(() => {
    return new Array(6).fill("").map((_, index) => (
      <Grid item lg={4} key={"useOrder" + index}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          height="100px"
          width="100%"
        />
      </Grid>
    ));
  }, []);

  const tabSkeleton = React.useMemo(() => {
    return (
      <TabsStyled className="mb-3" variant="scrollable">
        {new Array(6).fill("").map((_: string, index) => (
          <Tab
            key={index}
            value="all"
            label={<Skeleton variant="rectangular" />}
            className="me-4 tab-item"
          />
        ))}
      </TabsStyled>
    );
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <PageTitleSkleton width="240px" variant="text" className=" mb-4" />
      ) : (
        <PageTitle className="tab-content-title mb-4">
          {t("PROFILE.MY_ORDERS")}
        </PageTitle>
      )}

      {isLoading ? (
        tabSkeleton
      ) : (
        <TabsStyled
          value={tabValue}
          onChange={tabChange}
          className="mb-3"
          variant="scrollable"
        >
          <Tab value="all" label={t("PROFILE.ALL")} className="me-4 tab-item" />
          <Tab
            value="pending"
            label={t("PROFILE.PENDING")}
            className="me-4 tab-item"
          />
          <Tab
            value="accepted"
            label={t("PROFILE.ACCEPTED")}
            className="me-4 tab-item"
          />
          <Tab
            value="onTheWay"
            label={t("PROFILE.ONTHEWAY")}
            className="me-4 tab-item"
          />
          <Tab
            value="canceled"
            label={t("PROFILE.CANCELED")}
            className="me-4 tab-item"
          />
          <Tab
            value="delivered"
            label={t("PROFILE.DELIVERED")}
            className="me-4 tab-item"
          />
        </TabsStyled>
      )}

      <div className="mb-5">
        {get(data, "data.data.total") === 0 ? (
          <Grid xs={12}>
            <DataNotFound title="PROFILE.NOT_ORDERS" />
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {isLoading
              ? skleton
              : get(data, "data.data.data", []).map((order: IOrder) => (
                  <Grid
                    item
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    key={get(order, "_id")}
                  >
                    <Link href={`order/${get(order, "_id")}`}>
                      <Card order={order} />
                    </Link>
                  </Grid>
                ))}
          </Grid>
        )}
      </div>
    </Fragment>
  );
};

export default Orders;
