import { Skeleton } from "@mui/material";
import React from "react";
import { ISkletonList } from "./SkletonList.types";

const SkletonList: React.FC<ISkletonList> = ({ length = 7 }) => {
  return (
    <>
      {new Array(length).fill("").map((_: string, index: number) => (
        <Skeleton key={index + "wewewee"} className="mb-3" variant="text" />
      ))}
    </>
  );
};

export default SkletonList;
