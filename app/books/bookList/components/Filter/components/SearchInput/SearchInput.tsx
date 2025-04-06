"use client";

import React from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useTranslation } from "react-i18next";
import { SearchInputStyled } from "./SearchInput.style";
import { ISearchInput } from "./SearchInput.types";

const SearchInput: React.FC<ISearchInput> = ({ placeholder, ...props }) => {
  const { t } = useTranslation();
  return (
    <SearchInputStyled>
      <input
        type="text"
        className="filter-search-input"
        placeholder={placeholder ? t(placeholder) : ""}
        {...props}
      />
      <SearchIcon />
    </SearchInputStyled>
  );
};

export default SearchInput;
