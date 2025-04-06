import { Skeleton } from "@mui/material";
import React from "react";
import { SkletonListStyled } from "./BookCardSkeleton.style";

const BookCardSkeleton: React.FC<{ imgHeight?: string }> = ({
  imgHeight = "340px",
}) => {
  return (
    <SkletonListStyled>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "8px" }}
        height={imgHeight}
        width="100%"
        className="mb-2 book-image"
      ></Skeleton>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "4px" }}
        width="calc(100% - 10%)"
        height="22px"
        className="mb-1 text"
      ></Skeleton>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "4px" }}
        width="calc(100% - 70%)"
        className="mb-1 text"
        height="16px"
      ></Skeleton>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "4px" }}
        width="calc(100% - 50%)"
        className="mb-1 text"
        height="26px"
      ></Skeleton>
    </SkletonListStyled>
  );
};

export default BookCardSkeleton;
