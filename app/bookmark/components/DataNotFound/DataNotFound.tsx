import React from "react";
import { useTranslation } from "react-i18next";

const DataNotFound = () => {
  const { t } = useTranslation();
  return <h3 className="text-center">{t("COMMON.PRODUCT_NOT_FOUND")}</h3>;
};

export default DataNotFound;
