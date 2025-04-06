"use client";

import { debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { ALL_AUTHORS_ID } from "@/app/books/bookList/constants/bookList";
import { BookListContext } from "@/app/books/bookList/context";
import React from "react";
import { useTranslation } from "react-i18next";
import { IAuthor } from "@/types/common";
import Checkbox from "../../../Checkbox/Checkbox";
import { SearchInput } from "../../../Filter/components";
import {
  FilterTemplateContainer,
  TemplateList,
} from "../../../Filter/components/GenreFilter/GenreFilter.style";
import SkletonList from "../../../SkletonList/SkletonList";
import { IMobileAuthorFilter } from "./MobileAuthorFilter.types";

const MobileAuthorFilter: React.FC<IMobileAuthorFilter> = ({
  allCheckboxChange,
  checkboxChange,
  filter,
}) => {
  const { t } = useTranslation();
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const {
    actions: { getAuthors },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["getAuhorList", searchInputValue],
    queryFn: getAuthors,
  });

  function searchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value?.trim());
  }

  return (
    <FilterTemplateContainer className="mb-4">
      <div className="d-flex align-items-center mb-2 p-3 pb-0">
        <Checkbox
          id={ALL_AUTHORS_ID}
          color="warning"
          onChange={(event) =>
            allCheckboxChange(event, get(data, "data.data.data", []))
          }
          name="authorIds"
          checked={!!filter?.[ALL_AUTHORS_ID]?.length}
          className="checkbox"
        />
        <div className="font-600">{t("BOOKS.ALL_AUTHORS")}</div>
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
          get(data, "data.data.data", []).map((author: IAuthor) => (
            <li
              key={get(author, "_id")}
              className="d-flex align-items-center mb-3 pb-1"
            >
              <Checkbox
                id={get(author, "_id")}
                color="warning"
                name="authorIds"
                onChange={(event) => checkboxChange(event, ALL_AUTHORS_ID)}
                checked={filter?.["authorIds"]?.includes(author._id)}
                className="checkbox"
              />
              <label htmlFor={get(author, "_id")}>
                {get(author, "fullName", "")}
              </label>
            </li>
          ))
        )}
      </TemplateList>
    </FilterTemplateContainer>
  );
};

export default MobileAuthorFilter;
