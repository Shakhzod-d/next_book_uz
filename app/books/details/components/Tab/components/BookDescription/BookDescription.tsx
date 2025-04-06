"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { IBookDescription } from "./BookDescription.types";
// @ts-ignore
import parse from "html-react-parser";
import JsonToHtml from "@/utils/jsonToHtml/jsonToHtml";
import { BookDescriptionStyled } from "./BookDescription.style";
import { Skeleton } from "@mui/material";
import { DataNotFound } from "@/components";

const BookDescription: React.FC<IBookDescription> = ({
  description,
  isLoading,
}) => {
  const { t } = useTranslation();

  if (!description) return <DataNotFound title="BOOK_DETAILS.NO_INFORMATION" />;
  return (
    <BookDescriptionStyled className="p-3">
      {description && (
        <>
          <h1 className="book-description-title font-600 mb-2">
            {isLoading ? (
              <Skeleton height="30px" />
            ) : (
              String(t("DETAILS.PRODUCT_DESCRIPTION"))
            )}
          </h1>
          <div className="">
            {isLoading ? (
              <Skeleton height="30px" />
            ) : (
              <>{parse(JsonToHtml(description))}</>
            )}
          </div>
        </>
      )}
    </BookDescriptionStyled>
  );
};

export default BookDescription;
