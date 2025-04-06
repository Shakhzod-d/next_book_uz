"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import { OfferOfTheWeekCarousel } from "./OfferOfTheWeek.style";
import { SLIDER_SETTINGS } from "./OfferOfTheWeek.constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import { CarouselBookCard } from "../components";
import { useMediaQuery } from "@mui/material";
import PreviosIcon from "@/assets/icons/PreviosIcon";
import NextIcon from "@/assets/icons/NextIcon";
import { IBook } from "@/types/common";

const RenderPrevButton = ({ currentSlide, slideCount, ...props }: any) => {
  return (
    <button className="offer-the-week-prev-button" {...props}>
      <PreviosIcon />
    </button>
  );
};

const RenderNextButton = ({ currentSlide, slideCount, ...props }: any) => {
  return (
    <button className="offer-the-week-next-button" {...props}>
      <NextIcon />
    </button>
  );
};

const OfferOfTheWeek: React.FC<{
  categoryId?: string;
  categoryTitle?: string;
}> = ({ categoryId, categoryTitle }) => {
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const slidesToShow = 2.5;
  const isExtraSmallScreen = useMediaQuery("(max-width: 599.95px)");

  const getBooksByCategoryId = async (p: number, categoryId?: string) => {
    try {
      return await axios.get(
        `category/book?page=${p}&limit=10&categoryId=${categoryId}`
      );
    } catch (err) {
      throw err;
    }
  };

  const { data } = useQuery({
    queryKey: ["getBooks/OfferOfTheWeek", page, categoryId],
    queryFn: () => getBooksByCategoryId(page, categoryId),
    enabled: !!categoryId,
  });

  const beforeChange = (currentSlideIndex: number) => {
    if (
      books.length - 2 - slidesToShow === currentSlideIndex &&
      get(data, "data.data.total") > books.length
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (data) {
      const bookIds = books.map((book) => book._id);
      const uniqueId: Set<string> = new Set(bookIds);

      setBooks((prev) => {
        const filterArr = get(data, "data.data.data", []).filter(
          (book: IBook) => !uniqueId.has(book._id)
        );
        return prev.concat(filterArr);
      });

      uniqueId.clear();
    }
  }, [data]);

  const initialSlide = isExtraSmallScreen ? 0 : -0.5;

  return (
    <div className="container mb-5">
      <OfferOfTheWeekCarousel className="pt-4 offer-of-the-week">
        <h1 className="alternative-card-main-title mb-2"> {categoryTitle}</h1>
        <Slider
          {...SLIDER_SETTINGS}
          dots={false}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          nextArrow={<RenderNextButton />}
          prevArrow={<RenderPrevButton />}
          swipeToSlide
          beforeChange={beforeChange}
          pauseOnHover
          initialSlide={initialSlide}
          autoplay
          infinite
          autoplaySpeed={10000}
        >
          {books.map((book: IBook) => (
            <div className="pe-3 " key={book._id}>
              <CarouselBookCard book={book} />
            </div>
          ))}
        </Slider>
      </OfferOfTheWeekCarousel>
    </div>
  );
};

export default OfferOfTheWeek;
