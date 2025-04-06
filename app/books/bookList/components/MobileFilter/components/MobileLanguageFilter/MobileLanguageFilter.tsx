"use client";

import get from "lodash.get";
import { ALL_LANGUAGE_ID } from "@/app/books/bookList/constants/bookList";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FilterTemplateContainer,
  TemplateList,
} from "../../../Filter/components/GenreFilter/GenreFilter.style";
import { LANGUAGES } from "@/contants/enumTypes";
import Checkbox from "../../../Checkbox/Checkbox";
import { IMobileLanguageFilter } from "./MobileLanguageFilter.types";

const MobileLanguageFilter: React.FC<IMobileLanguageFilter> = ({
  allCheckboxChange,
  checkboxChange,
  filter,
}) => {
  const { t } = useTranslation();

  return (
    <FilterTemplateContainer className="mb-4">
      <div className="d-flex align-items-center mb-2 p-3 pb-0">
        <Checkbox
          color="warning"
          name="language"
          id={ALL_LANGUAGE_ID}
          checked={!!filter?.[ALL_LANGUAGE_ID]?.length}
          onChange={(event) => allCheckboxChange(event, LANGUAGES)}
          className="checkbox"
        />
        <div className="font-600">{t("FILTER.ALL_LANGUAGES")}</div>
      </div>
      <TemplateList className="m-0 list-unstyled pt-2 pb-3 ps-3 language-filter-list">
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
              checked={filter?.["language"]?.includes(language._id)}
              className="checkbox"
            />
            <div className="">{t(language.label)}</div>
          </li>
        ))}
      </TemplateList>
    </FilterTemplateContainer>
  );
};

export default MobileLanguageFilter;
