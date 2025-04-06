"use client";

import React from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { SkletonList } from "@/components";
import {
  AddCartButton,
  BookDetailsContentStyled,
  FeatureList,
  GoCheckoutButton,
} from "./BookDetailsContent.style";
import { totalDiscount } from "@/utils/totalDiscount/totalDiscount";
import formatter from "@/services/formatter";
import BookImagesCarousel from "../BookImagesCarousel/container/BookImagesCarousel";
import { IEnumTypeObject } from "@/types/enumTypes";
import {
  BOOK_CONTENT_LANGUAGE_LIST,
  BOOK_COVER_LIST,
  LANGUAGES,
} from "@/contants/enumTypes";
import StarIcon from "@/assets/icons/StarIcon";
import BagIcon from "@/assets/icons/BagIcon";
import AddComment from "../AddComment/AddComment";
import { IBookDetails } from "./BookDetailsContent.types";
import { useAddBookCart } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BookDetailsContent: React.FC<IBookDetails> = ({
  book,
  isLoading,
  status,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [addBook] = useAddBookCart();

  const addShoppingCardList = () => {
    addBook({
      _id: get(book, "_id"),
      amount: 1,
      author: get(book, "author"),
      bookPrice: book.bookPrice,
      cover: get(book, "cover"),
      discounts: get(book, "discounts", []),
      imgUrl: book.imgUrl,
      maxAmount: book.amount,
      name: book.name,
      state: book.state,
      link: book.link,
      genres: get(book, "genres", []),
    });
  };

  const findLanguage = (enumTypeList: IEnumTypeObject[], id: string) => {
    return enumTypeList.find((enumTypeObject) => enumTypeObject._id === id)
      ?.label;
  };

  const inscription = () => {
    const inscription = findLanguage(
      BOOK_CONTENT_LANGUAGE_LIST,
      get(book, "contentLanguage") as string
    );
    return t(`INSCRIPTION.${inscription}`);
  };

  const languageRender = () => {
    const language = findLanguage(LANGUAGES, get(book, "language", ""));
    return t(language || "");
  };

  const coverRender = () => {
    const cover = findLanguage(BOOK_COVER_LIST, get(book, "cover", ""));
    return t(`COVER.${cover}`);
  };

  return (
    <BookDetailsContentStyled className="mt-4">
      <Grid container alignItems="flex-start" className="productContent pb-2">
        <Grid lg={5} md={6} sm={5.3} xs={12} item>
          <BookImagesCarousel {...{ book, isLoading, status }} />
        </Grid>

        <Grid lg={7} md={6} sm={6.7} xs={12} item>
          <div className="book-info">
            {isLoading ? (
              <div>
                <Skeleton
                  className="book-name mb-3 mt-2"
                  width="100%"
                  variant="rectangular"
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  className="author-name mb-2"
                  variant="rectangular"
                  sx={{ borderRadius: "4px" }}
                  width="calc(35%)"
                />
                <div className="d-flex align-items-center">
                  <Skeleton
                    height="1.7rem"
                    className=""
                    sx={{ borderRadius: "4px" }}
                    width="3.5rem"
                  ></Skeleton>
                  <Skeleton
                    className="mx-2 "
                    height="1.7rem"
                    sx={{ borderRadius: "4px" }}
                    width="3.5rem"
                  ></Skeleton>
                  <Skeleton
                    sx={{ borderRadius: "4px" }}
                    width="4.5rem"
                    height="1.7rem"
                  ></Skeleton>
                </div>
                <Skeleton
                  sx={{ borderRadius: "4px" }}
                  className="book-price mt-2 font-700"
                  width="calc(25%)"
                />
              </div>
            ) : (
              <>
                <h4 className="book-name mt-0 mb-3">{get(book, "name", "")}</h4>
                <Link
                  href={`/authors/details/${get(book, "author._id")}`}
                  className="author-name mb-2"
                >
                  {get(book, "author.fullName", "")}
                </Link>

                <div className="d-flex align-items-center">
                  <div className="star-icon">
                    <StarIcon />
                  </div>
                  <span className="book-rate mx-2  font-500">
                    {book?.rating}
                  </span>
                  <span className="book-rate-count font-500">
                    ({get(book, "rateCount") + "  " + t("BOOK_DETAILS.PERSON")})
                  </span>
                  <div className="ms-3">
                    <AddComment bookId={get(book, "_id")} />
                  </div>
                </div>
                {totalDiscount(
                  get(book, "discounts"),
                  get(book, "bookPrice")
                ) !== 0 && (
                  <p className="book-old-price mt-2 mb-0">
                    {get(book, "bookPrice")}
                    &nbsp;UZS
                  </p>
                )}

                <div className="d-flex align-items-end mt-2 mb-3">
                  <p className="book-price  font-700 me-3">
                    {formatter(
                      get(book, "bookPrice") -
                        totalDiscount(
                          get(book, "discounts"),
                          get(book, "bookPrice")
                        )
                    )}
                    &nbsp;UZS
                  </p>

                  {book?.amount === 0 && book.type === "single" && (
                    <Typography
                      color="error"
                      variant="body1"
                      mb={0}
                      gutterBottom
                    >
                      {t("DETAILS.NOT_AVAILABLE")}
                    </Typography>
                  )}
                  {book?.amount === 0 && book.type === "collection" && (
                    <Typography
                      color="error"
                      variant="body1"
                      mb={0}
                      gutterBottom
                    >
                      {t("DETAILS.NOT_AVAILABLE")}
                    </Typography>
                  )}
                </div>
              </>
            )}
            {isLoading ? (
              <SkletonList
                length={7}
                height="24px"
                variant="rectangular"
                className="mb-3"
                sx={{ borderRadius: "3px" }}
              />
            ) : (
              <FeatureList className="list-untyled m-0 p-0">
                {get(book, "barcode", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">{t("DETAILS.ISBN")}</div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {get(book, "barcode")}
                    </div>
                  </li>
                )}

                {get(book, "contentLanguage", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">
                      {t("DETAILS.TYPE_OF_WRITE")}{" "}
                    </div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {inscription()}
                    </div>
                  </li>
                )}

                {get(book, "language", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">{t("DETAILS.YEAR")}</div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {get(book, "year")}
                    </div>
                  </li>
                )}

                {get(book, "language", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">
                      {t("DETAILS.LANGUAGE")}
                    </div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {languageRender()}
                    </div>
                  </li>
                )}

                {get(book, "numberOfPage", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">
                      {t("DETAILS.NUMBER_OF_PAGE")}
                    </div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {get(book, "numberOfPage")}
                    </div>
                  </li>
                )}

                {get(book, "publisher", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">
                      {t("DETAILS.PUBLISHING")}
                    </div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {get(book, "publisher.name", "")}
                    </div>
                  </li>
                )}

                {get(book, "cover", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key">{t("DETAILS.COVER")}</div>
                    <div className="line"></div>
                    <div className="table_cell value font-500">
                      {coverRender()}
                    </div>
                  </li>
                )}

                {get(book, "translator", "") && (
                  <li className="d-flex feature-list-item mb-3">
                    <div className="table_cell key ">
                      {t("DETAILS.TRANSLATOR")}
                    </div>
                    <div className="line"></div>
                    <div className="table_cell value  font-500">
                      {get(book, "translator")}
                    </div>
                  </li>
                )}
              </FeatureList>
            )}
            <div className="pt-4 d-flex align-items-center actions-btn">
              <AddCartButton
                onClick={addShoppingCardList}
                type="button"
                className="d-flex align-items-center"
                disabled={book?.amount === 0}
              >
                <BagIcon width="24px" height="24px" className="me-2" />

                {t("COMMON.ADD_TO_CARD")}
              </AddCartButton>

              <GoCheckoutButton
                type="button"
                disabled={book?.amount === 0}
                onClick={() =>
                  // navigate(`/cart/checkout/${book.link || book._id}`)
                  router.push(`/cart/checkout/${book.link || book._id}`)
                }
              >
                {t("BOOK_DETAILS.QUICK_BUY")}
              </GoCheckoutButton>
            </div>
          </div>
        </Grid>
      </Grid>
    </BookDetailsContentStyled>
  );
};

export default BookDetailsContent;
