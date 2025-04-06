"use client";

// import { useTheme } from "@mui/material";
import { useCustomSearchParams } from "@/hooks";
import get from "lodash.get";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FilterTemplateContainer,
  TemplateList,
} from "../GenreFilter/GenreFilter.style";
import { LANGUAGES } from "@/contants/enumTypes";
import { BookListContext } from "@/app/books/bookList/context";
import { ALL_LANGUAGE_ID } from "@/app/books/bookList/constants/bookList";
import Checkbox from "../../../Checkbox/Checkbox";
import { useSpring, animated } from "@react-spring/web";
import * as RiIcons from "react-icons/ri";
import { useSearchParams } from "next/navigation";
const RiArrowDropDownLine = RiIcons.RiArrowDropDownLine;

const LanguageFilter = () => {
  const { t } = useTranslation();
  const currentSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const {
    actions: { checkboxChange },
  } = React.useContext(BookListContext);

  const allCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSearchParams({
        ...searchParams,
        [event.target.name]: LANGUAGES.map((language) => get(language, "_id")),
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
    height: isOpen ? 250 : 0,
    overflow: "hidden",
    config: { tension: 250, friction: 25 },
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
            {t("FILTER.Langue") + ` (${LANGUAGES?.length})`}
          </div>
        </div>
        {/* @ts-ignore */}
        <animated.div style={iconAnimation} className="ml-2">
          <RiArrowDropDownLine size={24} />
        </animated.div>
      </div>
      {/* @ts-ignore */}
      <animated.div style={animation}>
        <TemplateList className="m-0 list-unstyled pt-2 pb-3 ps-3 language-filter-list">
          <div className="w-full d-flex align-items-center mb-3">
            <Checkbox
              color="warning"
              name="language"
              id={ALL_LANGUAGE_ID}
              // checked={location.search.includes(ALL_LANGUAGE_ID)}
              checked={currentSearchParams.has(ALL_LANGUAGE_ID)}
              onChange={allCheckboxChange}
              className="checkbox"
            />
            <div className="font-600 all-text">{t("FILTER.ALL_LANGUAGES")}</div>
          </div>
          {LANGUAGES.map((language) => (
            <li
              key={get(language, "_id")}
              className="d-flex align-items-center mb-3 pb-1"
            >
              <Checkbox
                id={language._id}
                color="warning"
                name="language"
                onChange={(event) => checkboxChange(event, ALL_LANGUAGE_ID)}
                // checked={location.search.includes("language=" + language._id)}
                checked={currentSearchParams.has(language._id)}
                className="checkbox"
              />
              <label htmlFor={language._id} className="checkbox-label">
                {t(language.label)}
              </label>
            </li>
          ))}
        </TemplateList>
      </animated.div>
    </FilterTemplateContainer>
  );
};

export default LanguageFilter;
