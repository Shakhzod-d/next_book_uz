"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import React from "react";
import OfferOfTheWeekAlternative from "../OfferOfTheWeekAlternative/OfferOfTheWeekAlternative";
import TopOfMonth from "../TopOfMonth/TopOfMonth";
import OfferOfTheWeek from "../OfferOfTheWeek/container/OfferOfTheWeek";

const MainCategoryBanner = () => {
  async function getCategory() {
    try {
      const response = await axios.get("category?page=1&limit=100");
      return response;
    } catch (err) {
      throw err;
    }
  }

  const { data } = useQuery({
    queryKey: ["getCategory22"],
    queryFn: getCategory,
  });

  return (
    <div>
      <OfferOfTheWeek
        categoryId={get(data, "data.data.data[0]._id")}
        categoryTitle={get(data, "data.data.data[0].name")}
      />
      <OfferOfTheWeekAlternative type={20} />
      <TopOfMonth
        categoryId={get(data, "data.data.data[1]._id")}
        categoryTitle={get(data, "data.data.data[1].name")}
      />
    </div>
  );
};

export default MainCategoryBanner;
