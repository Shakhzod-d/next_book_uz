import { MenuItem } from "@mui/material";
import ChevronUp from "@/assets/icons/ChevronUp";
import get from "lodash.get";
import React from "react";
import {
  MenuStyled,
  SortingStyled,
} from "@/app/books/bookList/components/Sorting/Sorting.style";
import { useTranslation } from "react-i18next";
import { NEWS_SORT_LIST } from "./Sorting.contants";
import { useCustomSearchParams } from "@/hooks";

const Sorting = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const defaultSelectedMenuText = (): string => {
    const findSortItem = NEWS_SORT_LIST.find(
      (sort) => get(searchParams, "type") === sort.type
    );
    if (findSortItem) return t(findSortItem.title);
    return t(NEWS_SORT_LIST[0].title);
  };

  const [selectedMenuText, setSelectedMenuText] = React.useState(
    defaultSelectedMenuText()
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const sortItemClick = ({
    type,
    title,
  }: {
    type: string | [];
    title: string;
  }) => {
    setSearchParams({
      ...searchParams,
      type,
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
        {NEWS_SORT_LIST.map((sort) => (
          <MenuItem
            key={sort.title}
            className="sorting-menu-item"
            onClick={() => sortItemClick(sort)}
          >
            {t(sort.title)}
          </MenuItem>
        ))}
      </MenuStyled>
    </SortingStyled>
  );
};

export default Sorting;
