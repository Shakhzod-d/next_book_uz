"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { DataNotFoundText } from "./DataNotFound.style";
import { IDataNotFound } from "./DataNotFound.types";

const DataNotFound: React.FC<IDataNotFound> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <DataNotFoundText className="text-center py-5">{t(title)}</DataNotFoundText>
  );
};

export default DataNotFound;
