"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import NextIcon from "@/assets/icons/NextIcon";
import PreviosIcon from "@/assets/icons/PreviosIcon";
import { BookCard } from "@/components";
import { SLIDER_SETTINGS } from "./TopOfMonth.constants";
import { TopOfMonthContainer, TopOfMonthStyled } from "./TopOfMonth.style";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { IBook } from "@/types/common";

const RenderPrevButton = ({ currentSlide, slideCount, ...rest }: any) => {
  return (
    <button {...rest}>
      <PreviosIcon />
    </button>
  );
};

const RenderNextButton = ({ currentSlide, slideCount, ...rest }: any) => {
  return (
    <button {...rest}>
      <NextIcon />
    </button>
  );
};

const TopOfMonth: React.FC<{ categoryId?: string; categoryTitle?: string }> = ({
  categoryId,
  categoryTitle,
}) => {
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const slidesToShow = 6;

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
    queryKey: ["getBooks/TopPFMonth", page, categoryId],
    queryFn: () => getBooksByCategoryId(page, categoryId),
    enabled: !!categoryId,
  });

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

  const beforeChange = (currentSlideIndex: number) => {
    if (
      books.length - 2 - slidesToShow === currentSlideIndex &&
      get(data, "data.data.total") > books.length
    ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <TopOfMonthContainer className="mb-5">
      <TopOfMonthStyled className="pt-4 top-of-month container">
        <h1 className="top-of-month-title mb-2"> {categoryTitle}</h1>
        <Slider
          {...SLIDER_SETTINGS}
          dots={false}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          nextArrow={<RenderNextButton />}
          prevArrow={<RenderPrevButton />}
          swipeToSlide
          beforeChange={beforeChange}
          lazyLoad="progressive"
          pauseOnHover
          autoplay
          infinite
          autoplaySpeed={10000}
        >
          {books.map((book: IBook) => (
            <div className="pe-3" key={book._id}>
              <BookCard
                amount={book.amount}
                discounts={get(book, "discounts", [])}
                _id={book._id}
                bookPrice={book.bookPrice}
                imgUrl={book.imgUrl}
                name={book.name}
                state={book.state}
                author={book.author}
                genres={get(book, "genres", [])}
                rating={get(book, "rating")}
                rateCount={get(book, "rateCount")}
              />
            </div>
          ))}
        </Slider>
      </TopOfMonthStyled>
    </TopOfMonthContainer>
  );
};

export default TopOfMonth;
