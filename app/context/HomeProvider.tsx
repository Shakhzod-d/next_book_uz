import React from "react";
import HomeContext from "./HomeContext";
import { IUseHome } from "./HomeContext.types";
import { useHome } from "./useHome";

const HomeProvider = ({ children }: any) => {
  const value: IUseHome = useHome();
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeProvider;
