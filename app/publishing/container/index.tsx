import React from "react";
import PublishingProvider from "../context/PublishingProvider";
import PublishingList from "./PublishingList";

const Index = () => {
  return (
    <PublishingProvider>
      <PublishingList />
    </PublishingProvider>
  );
};

export default Index;
