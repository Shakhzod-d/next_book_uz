import React from "react";
import SuccessfulContext from "./SuccessfulContext";
import { useSuccessful } from "./useSuccessful";

const SuccessfulProvider = ({ children }: any) => {
  const value = useSuccessful();

  return (
    <SuccessfulContext.Provider value={value}>
      {children}
    </SuccessfulContext.Provider>
  );
};

export default SuccessfulProvider;
