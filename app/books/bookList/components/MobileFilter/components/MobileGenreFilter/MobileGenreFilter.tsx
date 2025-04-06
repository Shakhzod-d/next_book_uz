"use client";

import { debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { BookListContext } from "@/app/books/bookList/context";
import React from "react";
import { useTranslation } from "react-i18next";
import { IGenre } from "@/types/common";
import { SearchInput } from "../../../Filter/components";
import {
  FilterTemplateContainer,
  TemplateList,
} from "../../../Filter/components/GenreFilter/GenreFilter.style";
import SkletonList from "../../../SkletonList/SkletonList";
import { ALL_GENRES_ID } from "../../../../constants/bookList";
import Checkbox from "../../../Checkbox/Checkbox";
import { IMobileGenreFilter } from "./MobileGenreFilter.types";

const MobileGenreFilter: React.FC<IMobileGenreFilter> = ({
  allCheckboxChange,
  checkboxChange,
  filter,
}) => {
  const { t } = useTranslation();
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const {
    actions: { getGenres },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["getGenreList", searchInputValue],
    queryFn: getGenres,
  });

  function searchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value?.trim());
  }

  return (
    <FilterTemplateContainer className="mb-4">
      <div className="d-flex align-items-center mb-2 p-3 pb-0">
        <Checkbox
          color="warning"
          name="genreIds"
          id={ALL_GENRES_ID}
          onChange={(event) =>
            allCheckboxChange(event, get(data, "data.data.data", []))
          }
          // checked={location.search.includes(ALL_GENRES_ID)}
          checked={!!filter?.[ALL_GENRES_ID]?.length}
          className="checkbox"
        />
        <div className="font-600">{t("FILTER.ALL_CATEGORIES")}</div>
      </div>
      <div className="px-3">
        <SearchInput
          onChange={debounce(searchInputChange, 400)}
          placeholder="COMMON.SEARCH"
        />
      </div>

      <TemplateList className="m-0 list-unstyled pt-2 pb-3 ps-3">
        {isLoading ? (
          <div className="pe-3 h-100">
            <SkletonList />
          </div>
        ) : (
          get(data, "data.data.data", []).map((genre: IGenre) => (
            <li
              key={get(genre, "_id")}
              className="d-flex align-items-center mb-3 pb-1"
            >
              <Checkbox
                checked={filter?.["genreIds"]?.includes(genre._id)}
                id={get(genre, "_id")}
                color="warning"
                onChange={(event) => checkboxChange(event, ALL_GENRES_ID)}
                name="genreIds"
                className="checkbox"
              />
              <label className="checkbox-label" htmlFor={get(genre, "_id")}>
                {get(genre, "name", "")}
              </label>
            </li>
          ))
        )}
      </TemplateList>
    </FilterTemplateContainer>
  );
};

export default MobileGenreFilter;
