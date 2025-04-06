import React from "react";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { CircularLoaderContainer } from "./Loader.style";

const Loader = () => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <CircularLoaderContainer className="d-flex align-items-center justify-content-center">
      <CircularProgress
        size={matches ? 30 : 40}
        thickness={matches ? 2.5 : 3}
        color="warning"
        disableShrink
        sx={{
          animationDuration: "400ms",
        }}
      />
    </CircularLoaderContainer>
  );
};

export default Loader;
