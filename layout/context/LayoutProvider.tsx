import React from "react";
import LayoutContext from "./LayoutContext";
import { useLayout } from "./useLayout";

const LayoutProvider = ({ children }: any) => {
  const value = useLayout();
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
