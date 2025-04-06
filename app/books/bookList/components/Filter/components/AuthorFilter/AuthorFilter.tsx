"use client";

import { debounce, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCustomSearchParams } from "@/hooks";
import get from "lodash.get";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IAuthor } from "@/types/common";
import { ALL_AUTHORS_ID } from "../../../../constants/bookList";
import { BookListContext } from "../../../../context";
import {
  FilterTemplateContainer,
  TemplateList,
} from "../GenreFilter/GenreFilter.style";
import SearchInput from "../SearchInput/SearchInput";
import SkletonList from "../../../SkletonList/SkletonList";
import Checkbox from "../../../Checkbox/Checkbox";
import { useSpring, animated } from "@react-spring/web";
import * as RiIcons from "react-icons/ri";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
const RiArrowDropDownLine = RiIcons.RiArrowDropDownLine;

const AuthorFilter = () => {
  const { t } = useTranslation();
  // const router = useRouter();
  // const currentSearchParams = router.query;
  // const currentSearchParams = useSearchParams();
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const {
    actions: { getAuthors, checkboxChange },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["getAuhorList", searchInputValue],
    queryFn: getAuthors,
    // keepPreviousData: true
  });

  function searchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value?.trim());
  }

  const allCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSearchParams({
        ...searchParams,
        [event.target.name]: get(data, "data.data.data", []).map(
          (author: IAuthor) => get(author, "_id")
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

  const [isOpen, setIsOpen] = useState(false);

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? 450 : 0,
    overflow: "hidden",
    config: { tension: 450, friction: 45 },
  });

  const iconAnimation = useSpring({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  });

  return (
    <FilterTemplateContainer>
      <div
        className="price-filter d-flex align-items-center mb-2 p-3 pb-0 justify-content-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full d-flex align-items-center">
          <div className="font-600 all-text">
            {t("FILTER.Author") +
              ` (${get(data, "data.data.data", [])?.length})`}
          </div>
        </div>
        <animated.div
          style={iconAnimation}
          // className="ml-2"
          children={<RiArrowDropDownLine size={24} />}
        />
        {/* <RiArrowDropDownLine size={24} /> */}
      </div>
      {/* @ts-ignore */}
      <animated.div style={animation}>
        <div className="px-3">
          <div className="w-full d-flex align-items-center mb-2">
            <Checkbox
              id={ALL_AUTHORS_ID}
              color="warning"
              onChange={allCheckboxChange}
              name="authorIds"
              // checked={location.search.includes(ALL_AUTHORS_ID)}
              // MUST CHECK LASTER
              checked={
                Array.isArray(searchParams.genreIds)
                  ? searchParams.genreIds.includes(ALL_AUTHORS_ID)
                  : searchParams.genreIds?.split(",").includes(ALL_AUTHORS_ID)
              }
              className="checkbox"
            />
            <div className="font-600 all-text">{t("BOOKS.ALL_AUTHORS")}</div>
          </div>
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
                  // checked={location.search.includes(author._id)}
                  // checked={Boolean(currentSearchParams[author._id])}
                  checked={
                    Array.isArray(searchParams.authorIds)
                      ? searchParams.authorIds.includes(get(author, "_id"))
                      : searchParams.authorIds
                          ?.split(",")
                          .includes(get(author, "_id"))
                  }
                  className="checkbox"
                />
                <label htmlFor={get(author, "_id")}>
                  {get(author, "fullName", "")}
                </label>
              </li>
            ))
          )}
        </TemplateList>
      </animated.div>
    </FilterTemplateContainer>
  );
};

export default AuthorFilter;
