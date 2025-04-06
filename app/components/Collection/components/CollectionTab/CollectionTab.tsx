"use client";

import React from "react";
import { Tab, Box, Skeleton, useMediaQuery } from "@mui/material";
import { CollectionSkeletonList, TabsStyled } from "./Collection.style";
import { ICategory } from "@/types/common";
import { ICollectionTab } from "./CollectionTab.types";

const CollectionTab: React.FC<ICollectionTab> = ({
  tabValue,
  setTabValue,
  isLoading,
  categories,
}) => {
  const matchesXS = useMediaQuery("(max-width: 599px)");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (tabValue !== newValue) setTabValue(newValue);
  };

  const skleton = React.useMemo(() => {
    return (
      <CollectionSkeletonList className="d-flex mb-4">
        {new Array(matchesXS ? 3 : 4).fill("").map((_: string, index) => (
          <Skeleton
            height="40px"
            width="100px"
            variant="rectangular"
            key={"collection-tab-skeleton" + index}
            className="me-4 collection-skeleton-list-item"
          />
        ))}
      </CollectionSkeletonList>
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }} className="mb-4">
      {isLoading ? (
        skleton
      ) : (
        <TabsStyled
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
        >
          {categories.slice(2).map((category: ICategory) => (
            <Tab
              value={category._id}
              key={category._id}
              label={category.name}
              className="me-4 tab-item"
            />
          ))}
        </TabsStyled>
      )}
    </Box>
  );
};

export default CollectionTab;
