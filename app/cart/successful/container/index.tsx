import React from "react";
import SuccessfulProvider from "../context/SuccessfulProvider";
import Successful from "./Successful";

const index = () => {
  return (
    <SuccessfulProvider>
      <Successful />
    </SuccessfulProvider>
  );
};

export default index;
