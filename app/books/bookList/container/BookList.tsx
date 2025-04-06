"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Actions, Filter, List, MobileFilter, Sorting } from "../components";
import { BookListStyled } from "./BookList.styles";
import { usePathname } from "next/navigation";

const BookList = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [openFilter, setOpenFilter] = useState(false);
  const [gridSize, setGridSize] = useState(3);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia("(max-width: 900px)").matches);
  }, []);

  const handleClickOpen = () => setOpenFilter(true);
  const handleClose = () => setOpenFilter(false);

  const listTitle = useMemo(
    () =>
      pathname === "/books"
        ? t("FILTER.BOOKS")
        : pathname === "/packages"
        ? t("FILTER.PACKAGES")
        : t("FILTER.DISCOUNTS"),
    [pathname, t]
  );

  return (
    <BookListStyled className="container pt-3">
      <Grid container columnSpacing={4}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          style={{ position: "relative" }}
        >
          {!matches && <Filter />}
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <div
            className={`d-flex justify-content-between align-items-center ${
              !matches ? "mb-4" : "mb-2"
            }`}
          >
            <div className="main-page-title">{listTitle}</div>
            <div className="d-flex align-items-center">
              <Actions {...{ setGridSize, gridSize, matches }} />
              {!matches && <Sorting />}
            </div>
          </div>
          {matches && (
            <Grid
              item
              className="d-flex align-items-center justify-content-between pb-2 additional-filter"
            >
              <MobileFilter />
              <Sorting />
            </Grid>
          )}
          <List {...{ gridSize, matches }} />
        </Grid>
      </Grid>
    </BookListStyled>
  );
};

export default BookList;
