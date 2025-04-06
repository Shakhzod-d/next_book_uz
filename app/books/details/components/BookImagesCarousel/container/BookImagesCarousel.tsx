"use client";

import get from "lodash.get";
import React, { useMemo, useRef } from "react";
import {
  BookImagescarousel,
  MainSlider,
  MainSliderSkleton,
  MiniSlider,
  MiniSliderSkleton,
} from "./BookImagesCarousel.style";
// import LOGO from "assets/images/Logo.svg";
import LOGO from "../../../../../../assets/images/Logo.svg";
// import { VerticalSliderCard } from "../components";
import MainImageCard from "../components/MainImageCard/MainImageCard";
import { useMediaQuery } from "@mui/material";
import { VERTICAL_CAROUSEL_SETTINGS } from "./BookImagesCarousel.constants";
import { useTranslation } from "react-i18next";
// import { IBookmark, TBookLabel, TBookState } from "types/common";
// import HeartIcon from "assets/icons/HeartIcon";
// import { BOOKMARK_KEY } from "contants/storage";
// import { useAddBookMark } from "hooks";
import { IBookImagesCarousel } from "./BookImagesCarousel.types";
import { defaultIsBookmark } from "@/utils";
import { useAddBookMark } from "@/hooks";
import { TBookLabel, TBookState } from "@/types/common";
import HeartFillIcon from "@/assets/icons/HeartFillIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import { VerticalSliderCard } from "../components";
// import HeartFillIcon from "assets/icons/HeartFillIcon";
// import { defaultIsBookmark } from "utils";

const BookImagesCarousel: React.FC<IBookImagesCarousel> = ({
  book,
  isLoading,
  status,
}) => {
  const verticalSliderRef = useRef<any>(null);
  const mainSliderRef = useRef<any>(null);
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width: 899px)");
  const matches600 = useMediaQuery("(max-width: 600px)");
  const matches830 = useMediaQuery("(max-width: 830px)");
  const [isBookmark, setIsBookMark] = React.useState(
    defaultIsBookmark(book?._id)
  );
  const [addToMark] = useAddBookMark();

  const heartIconClick = () => {
    const { isBookmark: newIsBookMark } = addToMark({
      _id: get(book, "_id"),
      amount: 1,
      author: get(book, "author"),
      bookPrice: book.bookPrice,
      cover: get(book, "cover"),
      discounts: get(book, "discounts", []),
      imgUrl: book.imgUrl,
      name: book.name,
      state: book.state,
      link: book.link,
      genres: get(book, "genres", []),
    });
    setIsBookMark(newIsBookMark);
  };

  const miniSliderSkleton = useMemo(() => {
    if (!matches)
      return (
        <div className="pe-3">
          {new Array(4).fill("", 0).map((_: unknown, index: number) => (
            <MiniSliderSkleton
              className="mb-1"
              variant="rectangular"
              key={"mini-slider-skleton" + index}
            />
          ))}
        </div>
      );
    else
      return (
        <div className="d-flex align-items-center pt-2">
          {new Array(matches830 ? 3 : 4)
            .fill("", 0)
            .map((_: unknown, index: number) => (
              <MiniSliderSkleton
                className="me-2"
                variant="rectangular"
                key={"mini-slider-skleton" + index}
              />
            ))}
        </div>
      );
  }, [matches, matches830]);

  const renderImgUrls: string[] = useMemo(() => {
    if (status === "success") {
      return [get(book, "imgUrl", LOGO), ...get(book, "additionalImgs", [])];
    }
    return [];
  }, [status, book]);

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
    <BookImagescarousel container matches={matches}>
      <button
        className="bookmark-wrapper d-flex align-items-center justify-content-center"
        onClick={heartIconClick}
      >
        {isBookmark ? (
          <HeartFillIcon width="24px" height="24px" className="like" />
        ) : (
          <HeartIcon width="24px" height="24px" className="dislike" />
        )}
      </button>
      <div className="d-flex justify-content-end">
        {!matches && (
          <div className="">
            {isLoading ? (
              miniSliderSkleton
            ) : (
              <MiniSlider
                dots={false}
                initialSlide={0}
                slidesToShow={
                  renderImgUrls.length <= 3 ? renderImgUrls.length : 4
                }
                slidesToScroll={1}
                vertical
                verticalSwiping
                focusOnSelect
                swipeToSlide
                asNavFor={mainSliderRef.current}
                ref={verticalSliderRef}
                className="details-vertical-slider"
                prevArrow={<></>}
                nextArrow={<></>}

                // lazyLoad
              >
                {renderImgUrls.map((imgUrl: string) => {
                  return (
                    <div key={"vertical" + imgUrl}>
                      <VerticalSliderCard imgUrl={imgUrl} />
                    </div>
                  );
                })}
              </MiniSlider>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="main-slider-wrap">
            <MainSliderSkleton variant="rectangular" />
          </div>
        ) : (
          <div className="main-slider-wrap ">
            <MainSlider
              asNavFor={verticalSliderRef.current}
              ref={mainSliderRef}
              className="details-main-slider"
              slidesToShow={1}
              prevArrow={<></>}
              nextArrow={<></>}
              dots={matches600}
              responsive={[]}
              fade
            >
              {renderImgUrls.map((imgUrl: string) => {
                return (
                  <div key={"main" + imgUrl}>
                    <MainImageCard imgUrl={imgUrl} />
                  </div>
                );
              })}
            </MainSlider>
          </div>
        )}
      </div>
      {matches && !matches600 && (
        <div>
          {
            isLoading ? miniSliderSkleton : "MUST CHECK"
            // <MiniSlider
            //   {...VERTICAL_CAROUSEL_SETTINGS}
            //   dots={false}
            //   initialSlide={0}
            //   slidesToShow={
            //     renderImgUrls.length <= 3 ? renderImgUrls.length : 4
            //   }
            //   slidesToScroll={1}
            //   vertical={false}
            //   verticalSwiping
            //   focusOnSelect
            //   swipeToSlide
            //   asNavFor={mainSliderRef.current}
            //   ref={verticalSliderRef}
            //   className="details-vertical-slider"
            //   prevArrow={<div></div>}
            //   nextArrow={<div></div>}
            //   //@ts-ignore
            //   lazyLoad={true}
            // >
            //   {renderImgUrls?.map((imgUrl: string) => {
            //     return (
            //       <div key={"vertical-mobile" + imgUrl}>
            //         <VerticalSliderCard imgUrl={imgUrl} />
            //       </div>
            //     );
            //   })}
            // </MiniSlider>
          }
        </div>
      )}
    </BookImagescarousel>
  );
};

export default BookImagesCarousel;
