"use client";

import { MenuItem } from "@mui/material";
import { useCustomSearchParams } from "@/hooks";
import ChevronUp from "@/assets/icons/ChevronUp";
import get from "lodash.get";
import React from "react";
import { useTranslation } from "react-i18next";
import { SORT_LIST } from "./Sorting.constants";
import { MenuStyled, SortingStyled } from "./Sorting.style";
import { IParam } from "./Sorting.types";

const Sorting = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const defaultSelectedMenuText = (): string => {
    const findSortItem = SORT_LIST.find(
      (sort) =>
        get(searchParams, "sortBy") === sort.params.sortBy &&
        get(searchParams, "asc") === sort.params.asc
    );
    if (findSortItem) return t(findSortItem.title);
    return t(SORT_LIST[0].title);
  };

  const [selectedMenuText, setSelectedMenuText] = React.useState(
    defaultSelectedMenuText
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const sortItemClick = (params: IParam, title: string) => {
    setSearchParams({
      ...searchParams,
      ...params,
      page: "1",
    });
    setSelectedMenuText(t(title));
    handleClose();
  };

  return (
    <SortingStyled isAnchor={!!anchorEl} className="ms-2">
      <button
        className="selected-button d-flex align-items-center"
        onClick={handleMenu}
        type="button"
      >
        {selectedMenuText}
        <span className="chevron-icon ms-2">
          <ChevronUp width="12px" height="12px" />
        </span>
      </button>
      <MenuStyled
        className="sorting-menu"
        id="book-sorting"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 40,
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {SORT_LIST.map((sort) => (
          <MenuItem
            key={sort.title}
            className="sorting-menu-item"
            onClick={() => sortItemClick(sort.params, sort.title)}
          >
            {t(sort.title)}
          </MenuItem>
        ))}
      </MenuStyled>
    </SortingStyled>
  );
};

export default Sorting;
