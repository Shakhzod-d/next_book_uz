"use client";

import React from "react";
import Slider from "react-slick";
import get from "lodash.get";
import BookCard from "../BookCard/BookCard";
import NextIcon from "@/assets/icons/NextIcon";
import { useTranslation } from "react-i18next";
import PreviosIcon from "@/assets/icons/PreviosIcon";
import { IBook, IBookCart } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/api/client";
import { SliderStyled, SliderTitle } from "./Slider.style";
import { ISlider } from "./Slider.types";

export const SLIDER_SETTINGS = {
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const CustomSlider: React.FC<ISlider> = ({
  url,
  dataPath = "data.data",
  search,
  title,
  enabled = true,
  setCarts,
}) => {
  const { t } = useTranslation();

  const [page, setPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const slidesToShow = 6;

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        url + `?page=${page}&limit=10&${search}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  React.useEffect(() => {
    return () => {
      setBooks([]);
    };
  }, [search]);

  const { data, isError } = useQuery({
    queryKey: ["data/getDataForSlider", page, search],
    queryFn: getData,
    enabled,
  });

  React.useEffect(() => {
    if (data) {
      const bookIds = books.map((book) => book._id);
      const uniqueId: Set<string> = new Set(bookIds);
      setBooks((prev) => {
        const filterArr = get(data, dataPath + ".data", []).filter(
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
      get(data, dataPath + ".total") > books.length
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const renderNextButton = () => {
    return (
      <button className="author-slick-next" type="button">
        <NextIcon width="17px" height="17px" />
      </button>
    );
  };

  const renderPrevButton = () => {
    return (
      <button className="author-slick-next" type="button">
        <PreviosIcon width="17px" height="17px" />
      </button>
    );
  };

  const handleCartClick = (bookCart: IBookCart) => {
    setCarts && setCarts((prev) => prev.concat(bookCart));
  };

  if (books.length === 0) return <></>;
  if (isError) return <></>;
  return (
    <>
      {title && <SliderTitle className="mb-3">{t(title)}</SliderTitle>}

      <SliderStyled className="main-slider">
        <Slider
          {...SLIDER_SETTINGS}
          dots={false}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          nextArrow={renderNextButton()}
          prevArrow={renderPrevButton()}
          infinite={false}
          swipeToSlide
          beforeChange={beforeChange}
          pauseOnHover
          autoplay
          autoplaySpeed={10000}
        >
          {books.map((book) => (
            <div className="pe-3" key={book._id}>
              <BookCard
                {...{
                  _id: book._id,
                  amount: book.amount,
                  author: get(book, "author"),
                  bookPrice: book.bookPrice,
                  discounts: get(book, "discounts", []),
                  imgUrl: book.imgUrl,
                  name: book.name,
                  state: book.state,
                  cover: book.cover,
                  link: book.link,
                  genres: get(book, "genres", []),
                  handleCartClick,
                }}
                rating={get(book, "rating")}
                rateCount={get(book, "rateCount")}
              />
            </div>
          ))}
        </Slider>
      </SliderStyled>
    </>
  );
};

export default React.memo(CustomSlider);
