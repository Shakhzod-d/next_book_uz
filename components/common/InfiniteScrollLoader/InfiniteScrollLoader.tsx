import { CircularProgress } from "@mui/material";
import React from "react";
import { InfiniteScrollLoaderStyled } from "./InfiniteScrollLoader.style";

const InfiniteScrollLoader = () => {
  return (
    <InfiniteScrollLoaderStyled>
      <CircularProgress
        disableShrink
        sx={{
          animationDuration: "500ms",
        }}
      />
    </InfiniteScrollLoaderStyled>
  );
};

export default InfiniteScrollLoader;
