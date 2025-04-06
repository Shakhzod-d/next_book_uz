import React from "react";
import PublishingContext from "./PublishingContext";
import { IUsePublishing } from "./PublishingContext.types";
import { usePublishing } from "./usePublishing";

const PublishingProvider = ({ children }: any) => {
  const value: IUsePublishing = usePublishing();
  return (
    <PublishingContext.Provider value={value}>
      {children}
    </PublishingContext.Provider>
  );
};

export default PublishingProvider;
