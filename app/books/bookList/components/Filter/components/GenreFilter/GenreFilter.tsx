"use client";

import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenre } from "@/types/common";
import SearchInput from "../SearchInput/SearchInput";
import { FilterTemplateContainer, TemplateList } from "./GenreFilter.style";
import { useCustomSearchParams } from "@/hooks";
import { BookListContext } from "@/app/books/bookList/context";
import { ALL_GENRES_ID } from "../../../../constants/bookList";
import SkletonList from "../../../SkletonList/SkletonList";
import Checkbox from "../../../Checkbox/Checkbox";
import { useDebounce } from "@/hooks/debounce/debounce";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const GenreFilter = () => {
  const { t } = useTranslation();
  // const location = useLocation();
  const searchParamss = useSearchParams();
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [isClient, setIsClient] = useState(false);
  const debouncedSearchValue = useDebounce(searchInputValue, 1000);

  const {
    actions: { getGenres, checkboxChange },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["getGenreList", debouncedSearchValue],
    queryFn: () => getGenres(debouncedSearchValue),
  });

  function searchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value?.trim());
  }
  useEffect(() => {
    setIsClient(true); // set to true after the component mounts on the client
  }, []);

  if (!isClient) {
    return null; // or return a loading spinner, etc.
  }

  const allCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSearchParams({
        ...searchParams,
        [event.target.name]: get(data, "data.data.data", []).map(
          (genre: IGenre) => get(genre, "_id")
        ),
        [event.target.id]: event.target.id,
      });
    } else {
      setSearchParams({
        ...searchParams,
        [event.target.name]: [],
        [event.target.id]: [],
      });
    }
  };

  return (
    <FilterTemplateContainer className="mb-4 border border-bottom-0">
      <div className="d-flex align-items-center mb-2 p-3 pb-0">
        <Checkbox
          color="warning"
          name="genreIds"
          id={ALL_GENRES_ID}
          onChange={allCheckboxChange}
          // checked={router.search.includes(ALL_GENRES_ID)}
          checked={searchParamss.has(ALL_GENRES_ID)}
          className="checkbox"
        />
        <div className="font-600 all-text">{t("FILTER.ALL_CATEGORIES")}</div>
      </div>
      <div className="px-3">
        <SearchInput
          value={searchInputValue}
          onChange={searchInputChange}
          placeholder="COMMON.SEARCH"
        />
      </div>

      <TemplateList className="m-0 list-unstyled pt-2 pb-3 ps-3">
        {/* {isLoading ? (
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
                                checked={location.search.includes(genre._id)}
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
                )} */}

        {isLoading ? (
          <div className="pe-3 h-100">
            <SkletonList />
          </div>
        ) : (
          [
            ...new Map(
              (get(data, "data.data.data", []) as IGenre[]).map((genre) => [
                get(genre, "name"),
                genre,
              ])
            ).values(),
          ].map((genre) => (
            <li
              key={get(genre, "_id")}
              className="d-flex align-items-center mb-3 pb-1"
            >
              <Checkbox
                // checked={location.search.includes(genre._id)}
                checked={searchParamss.has(genre._id)}
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

export default GenreFilter;
