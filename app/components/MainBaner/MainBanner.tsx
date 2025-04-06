"use client";

import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Category from "../Category/Category";
import MainCarousel from "../MainCarousel/MainCarousel";
import { Loader } from "@/components";

const MainBanner = () => {
  const [isClient, setIsClient] = useState(false);
  const matches = useMediaQuery("(max-width: 899px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <Grid container alignItems="start" className="container  mb-4 pb-2 ">
      {!matches && (
        <Grid item md={2.8} xs={3} className="pe-3">
          <Category />
        </Grid>
      )}
      <Grid item md={9.2} xs={12} sm={12}>
        <MainCarousel />
      </Grid>
    </Grid>
  );
};

export default MainBanner;
