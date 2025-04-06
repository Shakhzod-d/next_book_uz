"use client";

import { debounce } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FilterTemplateContainer } from "../GenreFilter/GenreFilter.style";
import { PriceSlider } from "./PriceFilter.style";
import { useCustomSearchParams } from "@/hooks";

const PriceFilter = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const minDistance = 10_000;
  const [value, setValue] = React.useState<number[]>([
    +searchParams["fromPrice"] || 0,
    +searchParams["toPrice"] || 800_000,
  ]);

  const handleChange = (
    _: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setSearchParams({
        ...searchParams,
        fromPrice: Math.min(newValue[0], value[1] - minDistance) + "",
        toPrice: value[1] + "",
      });
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setSearchParams({
        ...searchParams,
        fromPrice: value[0] + "",
        toPrice: Math.max(newValue[1], value[0] + minDistance) + "",
      });
    }
  };

  return (
    <FilterTemplateContainer className="mb-4">
      <div className=" mb-2 p-3 pb-4">
        <div className="font-600 mb-3 all-text">{t("BOOKS.PRICE")}</div>
        <PriceSlider
          value={value}
          onChange={debounce(handleChange, 300)}
          valueLabelDisplay="auto"
          min={0}
          max={800000}
          disableSwap
        />
      </div>
    </FilterTemplateContainer>
  );
};

export default PriceFilter;
