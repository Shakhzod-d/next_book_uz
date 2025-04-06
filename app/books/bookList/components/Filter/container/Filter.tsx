import React, { Suspense } from "react";
import {
  AuthorFilter,
  GenreFilter,
  LanguageFilter,
  PriceFilter,
} from "../components";
import { FilterStyled } from "./Filter.style";
import PublisherFilter from "../components/PublisherFilter/PublisherFilter";
import { Loader } from "@/components";

const Filter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FilterStyled>
        <GenreFilter />

        <PriceFilter />
        <LanguageFilter />
        <AuthorFilter />
        <PublisherFilter />
      </FilterStyled>
    </Suspense>
    // wrap here
  );
};

export default React.memo(Filter);
