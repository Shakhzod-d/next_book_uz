import { Skeleton } from "@mui/material";
import React from "react";
import { ISkletonList } from "./SkletonList.types";

const SkletonList: React.FC<ISkletonList> = ({ length, ...props }) => {
  return (
    <>
      {new Array(length).fill("").map((_: unknown, index) => (
        <Skeleton key={index} {...props} />
      ))}
    </>
  );
};

export default SkletonList;
