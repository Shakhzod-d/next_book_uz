"use client";

import get from "lodash.get";
import { BookDetailsContext } from "@/app/books/details/context";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MainImageCardStyled } from "./MainImageCard.style";
import { IMainImageCard } from "./MainImageCard.types";
import Logo from "./assets/Logo.png";
import { TBookLabel, TBookState } from "@/types/common";

const MainImageCard: FC<IMainImageCard> = ({ imgUrl }) => {
  const { t } = useTranslation();

  const {
    state: {
      getBookByIdState: { getBookByIdRes, getBookByIdStatus },
    },
  } = useContext(BookDetailsContext);

  const renderStatus = (state: TBookState, label: TBookLabel) => {
    if (state === "new") {
      return <div className="book-details-status new">{t("COMMON.NEW")}</div>;
    } else {
      if (label === "bestseller") {
        return (
          <div className="book-details-status bestseller">
            {t("COMMON.BESTSELLER")}
          </div>
        );
      } else if (label === "popular") {
        return (
          <div className="book-details-status popular">
            {t("COMMON.POPULAR")}
          </div>
        );
      } else if (label === "simple") return null;
    }
  };

  return (
    <MainImageCardStyled>
      {/* {renderStatus(
        get(getBookByIdRes, "data.state"),
        get(getBookByIdRes, "data.label")
      )} */}
      <LazyLoadImage
        effect="blur"
        src={imgUrl ? process.env.NEXT_PUBLIC_BASE_URL + imgUrl : Logo.src}
        className={imgUrl ? "img main-image" : "logo"}
        alt={
          get(getBookByIdRes, "data.seo.alt")
            ? get(getBookByIdRes, "data.seo.alt")
            : `${get(getBookByIdRes, "data.name")} - ${get(
                getBookByIdRes,
                "data.author.fullName",
                ""
              )}`
        }
      />
    </MainImageCardStyled>
  );
};

export default MainImageCard;
