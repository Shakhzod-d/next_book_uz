"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BasketCardStyled } from "./BasketCard.style";
import { IBasketCardProps } from "./BasketCard.types";
import { useAddBookMark } from "@/hooks";
import { defaultIsBookmark } from "@/utils";
import HeartFillIcon from "@/assets/icons/HeartFillIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import Logo from "../../../../../assets/images/Logo.svg";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import CancelIcon from "@/assets/icons/CancelIcon";
import formatter from "@/services/formatter";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
// import Logo from "assets/images/Logo.svg";
// import HeartIcon from "assets/icons/HeartIcon";
// import DeleteIcon from "assets/icons/DeleteIcon";
// import PlusIcon from "assets/icons/PlusIcon";
// import MinusIcon from "assets/icons/MinusIcon";
// import formatter from "services/formatter";
// import HeartFillIcon from "assets/icons/HeartFillIcon";
// import { useAddBookMark } from "hooks";
// import CancelIcon from "assets/icons/CancelIcon";
// import { defaultIsBookmark } from "utils";

const BasketCard: React.FC<IBasketCardProps> = ({
  bookCart,
  increment,
  decrement,
  deleteCart,
}) => {
  const { t } = useTranslation();
  const [addToMark] = useAddBookMark();

  const [isBookmark, setIsBookMark] = React.useState(
    defaultIsBookmark(bookCart._id)
  );

  const bookmarkButtonClick = () => {
    const { isBookmark: newIsBookmark } = addToMark({ ...bookCart });
    setIsBookMark(newIsBookmark);
  };

  return (
    <BasketCardStyled className="d-flex  py-3 pe-3">
      <div className="cart-left">
        <button
          onClick={bookmarkButtonClick}
          type="button"
          className="mobile-heart-btn d-flex align-items-center"
        >
          {isBookmark ? (
            <HeartFillIcon className="fill" width="12px" height="12px" />
          ) : (
            <HeartIcon width="12px" height="12px" />
          )}
        </button>
        <LazyLoadImage
          src={
            bookCart.imgUrl
              ? process.env.NEXT_PUBLIC_BASE_URL + bookCart.imgUrl
              : Logo
          }
          className="cart-image px-3 "
          effect="blur"
          alt={bookCart.name}
        />
      </div>

      <div className="cart-right d-flex">
        <div className="cart-details">
          <div>
            <div className="cart-name mb-2 font-600">{bookCart.name}</div>
            <div className="cart-price mb-3">
              Narxi: {formatter(bookCart.bookPrice)}
            </div>
            <div className="cart-actions d-flex align-items-center ">
              <button
                type="button"
                className="me-3 bookmark-btn d-flex align-items-center"
                onClick={bookmarkButtonClick}
              >
                {isBookmark ? (
                  <HeartFillIcon className="fill" />
                ) : (
                  <HeartIcon />
                )}
                <span className="ms-2">{t("BASKET.BOOKMARK")}</span>
              </button>
              <button
                type="button"
                className="delete-btn d-flex align-items-center"
              >
                <DeleteIcon />
                <span className="ms-2" onClick={() => deleteCart(bookCart._id)}>
                  {t("COMMON.DELETE")}
                </span>
              </button>
            </div>
          </div>
          <span
            className="mobile-cancel-icon"
            onClick={() => deleteCart(bookCart._id)}
          >
            <CancelIcon width="20px" height="20px" />
          </span>
        </div>
        <div className="card-right-end">
          <div className="cart-price font-600">
            {formatter(bookCart.bookPrice)} so‘m
          </div>
          <div className="book-count-wrapper px-2 py-1 d-flex align-items-center justify-content-between">
            <button
              className="minus-btn"
              onClick={() => decrement(bookCart._id)}
              disabled={bookCart.amount === 1}
            >
              <MinusIcon />
            </button>

            <div className="book-count">{bookCart.amount}</div>

            <button
              className="minus-btn"
              onClick={() => increment(bookCart._id)}
              disabled={bookCart.amount === bookCart.maxAmount}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </BasketCardStyled>
  );
};

export default BasketCard;
