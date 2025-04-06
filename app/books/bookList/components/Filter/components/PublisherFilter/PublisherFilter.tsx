"use client";

import { debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCustomSearchParams } from "@/hooks";
import get from "lodash.get";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IPublisher } from "@/types/common";
import {
  ALL_AUTHORS_ID,
  ALL_Publisher_ID,
} from "../../../../constants/bookList";
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
import { useSearchParams } from "next/navigation";

const RiArrowDropDownLine = RiIcons.RiArrowDropDownLine;

const PublisherFilter = () => {
  const { t } = useTranslation();
  const currentSearchParams = useSearchParams();
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const {
    actions: { getAuthors, checkboxChange, getPublishers },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["publisher", searchInputValue],
    queryFn: getPublishers,
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
          (publisher: IPublisher) => get(publisher, "_id")
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
    <FilterTemplateContainer className="mb-4">
      <div
        className="price-filter d-flex align-items-center mb-2 p-3 pb-0 justify-content-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full d-flex align-items-center">
          <div className="font-600 all-text">
            {t("FILTER.Publisher") +
              ` (${get(data, "data.data.data", [])?.length})`}
          </div>
        </div>
        {/* @ts-ignore */}
        <animated.div style={iconAnimation} className="ml-2">
          <RiArrowDropDownLine size={24} />
        </animated.div>
      </div>
      {/* @ts-ignore */}
      <animated.div style={animation}>
        <div className="px-3">
          <div className="w-full d-flex align-items-center mb-2">
            <Checkbox
              id={ALL_Publisher_ID}
              color="warning"
              onChange={allCheckboxChange}
              name="publisherIds"
              // checked={location.search.includes(ALL_Publisher_ID)}
              checked={currentSearchParams.has(ALL_Publisher_ID)}
              className="checkbox"
            />
            <div className="font-600 all-text">{t("BOOKS.ALL_Publisher")}</div>
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
            get(data, "data.data.data", []).map((publisher: IPublisher) => (
              <li
                key={get(publisher, "_id")}
                className="d-flex align-items-center mb-3 pb-1"
              >
                <Checkbox
                  id={get(publisher, "_id")}
                  color="warning"
                  name="publisherIds"
                  onChange={(event) => checkboxChange(event, ALL_Publisher_ID)}
                  // checked={location.search.includes(publisher._id)}
                  checked={currentSearchParams.has(publisher._id)}
                  className="checkbox"
                />
                <label htmlFor={get(publisher, "_id")}>
                  {get(publisher, "name", "")}
                </label>
              </li>
            ))
          )}
        </TemplateList>
      </animated.div>
    </FilterTemplateContainer>
  );
};

export default PublisherFilter;
