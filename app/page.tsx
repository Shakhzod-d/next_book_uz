"use client";

import React from "react";
import {
  BookAmount,
  Collection,
  DownloadApp,
  Features,
  MainBanner,
  MainCategoryBanner,
  News,
} from "./components";

const Home = () => {
  return (
    <React.Fragment>
      {/* <TechnicalWorkNotice /> */}
      <MainBanner />
      <Features />
      <Collection />
      <MainCategoryBanner />
      <DownloadApp />
      <BookAmount />
      <News />
    </React.Fragment>
  );
};

export default Home;
