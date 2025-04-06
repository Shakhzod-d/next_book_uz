import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CarouselBookCardStyled } from "./CarouselBookCard.style";
import { ICarouselBookCard } from "./CarouselBookCard.types";
import BigLogo from "../../../../../assets/images/LogoBig.svg";
import get from "lodash.get";
import { defaultIsBookmark } from "@/utils";
import { useAddBookMark } from "@/hooks";
import formatter from "@/services/formatter";
import HeartFillIcon from "@/assets/icons/HeartFillIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import { useRouter } from "next/navigation";

const CarouselBookCard: React.FC<ICarouselBookCard> = ({ book }) => {
  const [isClick, setIsClick] = React.useState(false);
  const [isBookmark, setIsBookMark] = React.useState(
    defaultIsBookmark(book._id)
  );
  const router = useRouter();
  const [addToMark] = useAddBookMark();

  const bookCardClick = () => {
    // navigate({ pathname: `/books/details/${book.link || book._id}` });
    // MUST CHECK LATER
    !isClick && router.push(`/books/details/${book.link || book._id}`);
  };

  const heartIconClick = () => {
    const { isBookmark: newIsBookmark } = addToMark({
      _id: book._id,
      amount: book.amount,
      bookPrice: book.bookPrice,
      author: get(book, "author"),
      cover: book.cover,
      discounts: get(book, "discounts", []),
      imgUrl: book.imgUrl,
      name: book.name,
      state: book.state,
      link: get(book, "link"),
      genres: get(book, "genres", []),
    });
    setIsBookMark(newIsBookmark);
  };

  return (
    <CarouselBookCardStyled
      onMouseDown={() => setIsClick(false)}
      onMouseMove={() => setIsClick(true)}
      onClick={bookCardClick}
    >
      <ul className="list-unstyled m-0 p-0 book-card-container d-flex align-items-center">
        <li className="book-card-left">
          <div className="week-slider-image">
            <LazyLoadImage
              effect="blur"
              className="lazy-image"
              src={
                book.imgUrl
                  ? process.env.NEXT_PUBLIC_BASE_URL + book.imgUrl
                  : BigLogo
              }
            />
          </div>
        </li>
        <li className="book-card-right pe-4">
          <div className="py-3">
            <h5 className="alternative-card-title mb-2">
              {get(book, "name", "")}
            </h5>
            <p className="altennative-card-text mb-2">
              {get(book, "author.fullname", "")}
            </p>
            <div className="rate-text mb-2">
              {book?.rating?.toFixed(1)} ({get(book, "rateCount")} odam)
            </div>
            <div className="d-flex justify-content-between ">
              <div className="alternative-card-price">
                {formatter(book.bookPrice)} sum
              </div>
              <div onClick={(event) => event.stopPropagation()}>
                <button
                  className="boomark-btn d-flex justify-content-center align-items-center"
                  onClick={heartIconClick}
                >
                  {isBookmark ? (
                    <HeartFillIcon
                      className="fill"
                      width="16px"
                      height="16px"
                    />
                  ) : (
                    <HeartIcon width="16px" height="16px" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </CarouselBookCardStyled>
  );
};

export default CarouselBookCard;
