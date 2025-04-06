"use client";

import React from "react";
import Grid3Icon from "@/assets/icons/Grid3Icon";
import Grid4Icon from "@/assets/icons/Grid4Icon";
import Grid5Icon from "@/assets/icons/Grid5Icon";
import { useCustomSearchParams } from "@/hooks";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { ActionsContainer, CountButton } from "./Actions.style";
import { IActions } from "./Actions.types";
import { useTheme } from "@mui/material";

const Actions: React.FC<IActions> = ({ setGridSize, gridSize, matches }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useCustomSearchParams();

  const changeLimit = (newLimit: number) => {
    setSearchParams({
      ...searchParams,
      limit: newLimit.toString(),
    });
  };

  return (
    <ActionsContainer className="d-flex align-items-center">
      {!matches && (
        <>
          <div className="d-flex align-items-center">
            <div className="limit-text me-2">{t("BOOKS.VIEW")}</div>
            <CountButton
              mode={get(theme, "palette.mode")}
              onClick={() => changeLimit(9)}
              className={`${+get(searchParams, "limit") === 9 ? "active" : ""}`}
            >
              {" "}
              9
            </CountButton>
            <CountButton
              mode={get(theme, "palette.mode")}
              className={`mx-2 ${
                +get(searchParams, "limit") === 24 ? "active" : ""
              }`}
              onClick={() => changeLimit(24)}
            >
              24
            </CountButton>
            <CountButton
              mode={get(theme, "palette.mode")}
              onClick={() => changeLimit(36)}
              className={`${
                +get(searchParams, "limit") === 36 ? "active" : ""
              }`}
            >
              36
            </CountButton>
          </div>
          <div className="d-flex align-items-center ms-3">
            <div
              className={`grid-icon ${gridSize === 4 ? "active" : ""}`}
              onClick={() => setGridSize(4)}
            >
              <Grid3Icon />
            </div>
            <div
              className={`grid-icon mx-2 ${gridSize === 3 ? "active" : ""}`}
              onClick={() => setGridSize(3)}
            >
              <Grid4Icon />
            </div>
            <div
              className={`grid-icon ${gridSize === 2.4 ? "active" : ""}`}
              onClick={() => setGridSize(2.4)}
            >
              <Grid5Icon />
            </div>
          </div>
        </>
      )}
    </ActionsContainer>
  );
};

export default React.memo(Actions);
