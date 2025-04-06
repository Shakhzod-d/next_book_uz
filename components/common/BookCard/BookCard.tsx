"use client";

// import get from "lodash.get";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BookCardStyled, Flex } from "./BookCard.style";
import { IBookCard } from "./BookCard.types";
import BagIcon from "../../../assets/icons/BagIcon";
// import { useNavigate } from "react-router-dom";
import LogoBig from "../../../assets/images/Logo.svg";
import { useTranslation } from "react-i18next";
import formatter from "@/services/formatter";
import { useAddBookCart, useAddBookMark } from "@/hooks";
import { IBookCart } from "@/types/common";
import HeartFillIcon from "@/assets/icons/HeartFillIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import { totalDiscount } from "@/utils/totalDiscount/totalDiscount";
import StarIcon from "@/assets/icons/StarIcon";
import { defaultIsBookmark } from "@/utils";
import { useRouter } from "next/navigation";

const CardActions: React.FC<IBookCard> = ({
  _id,
  author,
  bookPrice,
  imgUrl,
  name,
  link,
  amount,
  discounts,
  state,
  cover,
  genres,
  handleCartClick,
}) => {
  const [isBookmark, setIsBookMark] = React.useState(defaultIsBookmark(_id));

  const [addToMark] = useAddBookMark();

  const heartIconClick = () => {
    const { isBookmark: newIsBookMark } = addToMark({
      _id,
      amount,
      bookPrice,
      discounts,
      imgUrl,
      name,
      cover,
      state,
      author,
      link,
      genres,
    });
    setIsBookMark(newIsBookMark);
  };

  const cart: IBookCart = {
    _id,
    amount: 1,
    bookPrice,
    cover,
    discounts,
    imgUrl: imgUrl || "",
    maxAmount: amount,
    name,
    state,
    link,
    author,
    genres,
  };

  return (
    <div className="card-actions">
      <div
        onClick={(e) => e.stopPropagation()}
        className="d-flex justify-content-end pb-1 "
      >
        <button onClick={heartIconClick} className="heart-card-button">
          <div className=" d-flex align-items-center justify-content-center">
            {isBookmark ? (
              <HeartFillIcon className="fill" width="24px" height="24px" />
            ) : (
              <HeartIcon width="24px" height="24px" />
            )}
          </div>
        </button>
      </div>
      {/* <div onClick={(e) => e.stopPropagation()}>
        <button
          className="shopping-card-button"
          onClick={() => {
            addToCart(cart);
            handleCartClick && handleCartClick(cart);
          }}
        >
          <BagIcon width="26px" height="26px" />
        </button>
      </div> */}
    </div>
  );
};

const BookCard: React.FC<IBookCard> = ({
  _id,
  author,
  authors,
  bookPrice,
  imgUrl,
  name,
  link,
  amount,
  discounts,
  state,
  cover,
  genres,
  handleCartClick,
  rating,
  rateCount,
}) => {
  const router = useRouter();
  const [isAvaibleAction, setIsAvaibleAction] = React.useState(false);
  const [isClick, setIsClick] = React.useState(false);
  const { t } = useTranslation();
  const bookCardClick = () => {
    if (!isClick) {
      // navigate({ pathname: `/books/details/${link || _id}` });
      // MUST CHECK LATER
      router.push(`/books/details/${link || _id}`);
      window.scrollTo(0, 0);
    }
  };

  const cart: IBookCart = {
    _id,
    amount: 1,
    bookPrice,
    cover,
    discounts,
    imgUrl: imgUrl || "",
    maxAmount: amount,
    name,
    state,
    link,
    author,
    genres,
  };
  const [addToCart] = useAddBookCart();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAvaibleAction(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // const book = get(data, "data.data");
  return (
    <BookCardStyled
      onMouseDown={() => setIsClick(false)}
      onMouseMove={() => setIsClick(true)}
      onClick={bookCardClick}
    >
      <div style={{ flex: 1 }}>
        <div className="book-card-image-wrapper mb-2">
          <LazyLoadImage
            src={imgUrl ? process.env.NEXT_PUBLIC_BASE_URL + imgUrl : LogoBig}
            effect="blur"
            className={`book-card-image ${!imgUrl ? "logo-image" : ""}`}
            afterLoad={() => setIsAvaibleAction(true)}
          />
          {isAvaibleAction && (
            <CardActions
              {...{
                _id,
                author,
                bookPrice,
                imgUrl,
                name,
                link,
                amount,
                discounts,
                genres,
                state,
                cover,
                handleCartClick,
              }}
            />
          )}
        </div>

        <p className="card-title mb-1">{name}</p>
        {/* <p className="card-text mb-1">{get(author, "fullName")}</p> */}
        {/* {Array.isArray(authors) ? (
        authors?.map((item) => get(item, "fullName"))
      ) : (
        <p className="card-text mb-1">{get(author, "fullName")}</p>
      )} */}

        <div className="card-old-price">
          {totalDiscount(discounts, bookPrice) !== 0 && (
            <>
              {bookPrice}
              &nbsp;UZS
            </>
          )}
        </div>
        <div className="card-price-text">
          {formatter(bookPrice - totalDiscount(discounts, bookPrice))}
          &nbsp;UZS
        </div>
        <div className="d-flex align-items-center">
          <div className="star-icon">
            <StarIcon />
          </div>
          <span
            className="book-rate mx-2  font-500 text"
            style={{ fontSize: "14px" }}
          >
            {rating}
          </span>
          <span
            className="book-rate-count font-500"
            style={{ fontSize: "14px" }}
          >
            ({rateCount + " " + t("BOOK_DETAILS.PERSON")})
          </span>
        </div>
      </div>
      <Flex onClick={(e) => e.stopPropagation()}>
        <button
          className="button"
          onClick={() => {
            setIsClick(true);
            router.push(`/cart/checkout/${link || _id}`);
          }}
        >
          {t("BOOK_DETAILS.QUICK_BUY")}
        </button>
        <div onClick={(e) => e.stopPropagation()}>
          <button
            className="shopping-card-button"
            onClick={() => {
              addToCart(cart);
              handleCartClick && handleCartClick(cart);
            }}
          >
            <BagIcon width="26px" height="26px" />
          </button>
        </div>
      </Flex>
    </BookCardStyled>
  );
};

export default BookCard;
