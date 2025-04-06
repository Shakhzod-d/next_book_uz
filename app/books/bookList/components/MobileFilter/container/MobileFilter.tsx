"use client";

import { Button, Dialog, Grid, useTheme } from "@mui/material";
import CancelIcon from "@/assets/icons/CancelIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
// import { Button } from "components";
import { useCustomSearchParams } from "@/hooks";
import get from "lodash.get";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MobileAuthorFilter,
  MobileGenreFilter,
  MobileLanguageFilter,
  MobilePriceFilter,
} from "../components";
import { FilterButton, MobileFilterStyled } from "./MobileFilter.style";
import { IFilter } from "./MobileFilter.types";

const MobileFilter = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [filter, setFilter] = React.useState<IFilter | null>(searchParams);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyFilter = () => {
    setSearchParams({
      ...searchParams,
      ...filter,
    });
    handleClose();
  };

  const allCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    array: any[]
  ) => {
    if (event.target.checked) {
      setFilter((prev) => ({
        ...prev,
        [event.target.name]: array.map((item) => get(item, "_id")),
        [event.target.id]: event.target.id,
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [event.target.name]: [],
        [event.target.id]: [],
      }));
    }
  };

  const checkboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    allCheckboxId: string
  ) => {
    let ids = (
      Array.isArray(filter?.[event.target.name])
        ? filter?.[event.target.name]
        : typeof filter?.[event.target.name] === "string"
        ? [filter?.[event.target.name]]
        : []
    ) as string[];

    if (!event.target.checked) {
      ids.splice(ids.indexOf(event.target.id), 1);
      setFilter((prev) => ({
        ...prev,
        [event.target.name]: ids,
        [allCheckboxId]: [],
        page: "1",
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [event.target.name]: [...ids, event.target.id],
        page: "1",
      }));
    }
  };

  const priceChange = (newPriceFilter: IFilter) => {
    setFilter((prev) => ({ ...prev, ...newPriceFilter }));
  };

  return (
    <>
      <FilterButton
        onClick={handleClickOpen}
        className="filter-btn d-flex align-items-center font-500"
      >
        <span className="me-2">
          <FilterIcon />
        </span>
        {t("BOOKS.FILTERS")}
      </FilterButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: get(theme, "palette.background.default"),
          },
        }}
      >
        {open && (
          <MobileFilterStyled className="container">
            <div className="mobile-filter-header d-flex justify-content-between align-items-center py-4">
              <div className="d-flex align-items-center">
                <span className="me-2">
                  <FilterIcon width="16px" height="16px" />
                </span>
                {t("BOOKS.FILTERS")}
              </div>
              <button
                className="mobile-filter-cancel-btn"
                onClick={handleClose}
              >
                <CancelIcon />
              </button>
            </div>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} sm={4}>
                <MobileGenreFilter
                  {...{ allCheckboxChange, checkboxChange, filter }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MobileAuthorFilter
                  {...{ allCheckboxChange, checkboxChange, filter }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MobileLanguageFilter
                  {...{ allCheckboxChange, checkboxChange, filter }}
                />
                <MobilePriceFilter {...{ filter, priceChange }} />
              </Grid>
            </Grid>
            <div className="d-flex justify-content-end py-3">
              <Button
                type="button"
                value={t("BOOKS.FILTER_APPLY")}
                variant="contained"
                color="warning"
                onClick={applyFilter}
              />
            </div>
          </MobileFilterStyled>
        )}
      </Dialog>
    </>
  );
};

export default MobileFilter;
