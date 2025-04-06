"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import React from "react";
import { CollectionTabContent } from "../components";
import Tab from "../components/CollectionTab/CollectionTab";
import { CollectionContainer } from "./Collection.style";

const Collection = () => {
  const [tabValue, setTabValue] = React.useState<string>(
    "6730bca4bc8d54d401afc1e0"
  );

  async function getCategory() {
    try {
      const response = await axios.get("category?page=1&limit=50");
      return response;
    } catch (err) {
      throw err;
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getCategory"],
    queryFn: getCategory,
    // onSuccess: (res) => {
    //   if (get(res, "data.data.data[0]._id", "") !== tabValue) {
    //     setTabValue(get(res, "data.data.data[2]._id", ""));
    //   }
    // },
  });

  React.useEffect(() => {
    const firstCategoryId = get(data, "data.data.data[2]._id", "");
    if (firstCategoryId && firstCategoryId !== tabValue) {
      setTabValue(firstCategoryId);
    }
  }, [data, tabValue]);

  return (
    <CollectionContainer className="py-5">
      <div className="container">
        <Tab
          {...{
            tabValue,
            setTabValue,
            categories: get(data, "data.data.data", []),
            isLoading,
          }}
        />
        <CollectionTabContent {...{ tabValue, isCategoryLoading: isLoading }} />
      </div>
    </CollectionContainer>
  );
};

export default Collection;
