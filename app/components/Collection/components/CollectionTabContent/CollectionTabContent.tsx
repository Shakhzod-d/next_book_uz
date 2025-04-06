"use client";

import React, { useMemo } from "react";
import { Grid, useTheme } from "@mui/material";
import { BookCard, BookCardSkeleton } from "@/components";
import { ICollectionTabContent } from "./CollectionTabContent.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadMoreImage from "../../../../../assets/images/LoadMore.png";
import get from "lodash.get";
import { IBook } from "@/types/common";
import { LoadMore } from "./CollectionTabContent.style";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useMediaQuery from "@mui/material/useMediaQuery";

const CollectionTabContent: React.FC<ICollectionTabContent> = ({
  tabValue,
  isCategoryLoading,
}) => {
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const loadMoreRef = useRef<null | HTMLButtonElement>(null);
  const theme = useTheme();
  const xs = useMediaQuery(theme?.breakpoints?.down("sm"));
  const sm = useMediaQuery(theme?.breakpoints?.down("md"));
  const md = useMediaQuery(theme?.breakpoints?.down("lg"));

  const loadMore = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const limit = useMemo(() => {
    if (xs) {
      return page === 1 ? 3 : 4;
    } else if (sm) {
      return page === 1 ? 5 : 6;
    } else if (md) {
      return page === 1 ? 7 : 8;
    }

    return page === 1 ? 11 : 12;
  }, [page]);

  const getBookBuCategoryId = async (page: number, tabValue: string) => {
    let response = {};
    if (tabValue) {
      try {
        response = await axios.get(
          `category/book?page=${page}&limit=${limit}&categoryId=${tabValue}`,
          {
            maxContentLength: 165902,
            // contentLength: 165902,
          }
        );
      } catch (err) {
        throw err;
      }
    }
    return response;
  };

  const { data, isFetching } = useQuery({
    queryKey: ["getBookByCategoryId", page, tabValue, limit],
    queryFn: () => getBookBuCategoryId(page, tabValue),
    placeholderData: (previousData) => previousData,
    // onSuccess: (res) => {
    //   const bookIds = books.map((book) => book._id);
    //   const uniqueId: Set<string> = new Set(bookIds);
    //   setBooks((prev) => {
    //     const filterArr = get(res, "data.data.data", []).filter(
    //       (book: IBook) => !uniqueId.has(book._id)
    //     );
    //     return prev.concat(filterArr);
    //   });
    //   uniqueId.clear();
    // },
  });

  React.useEffect(() => {
    if (data) {
      const bookIds = books.map((book) => book._id);
      const uniqueId: Set<string> = new Set(bookIds);

      const filterArr = get(data, "data.data.data", []).filter(
        (book: IBook) => !uniqueId.has(book._id)
      );

      setBooks((prev) => [...prev, ...filterArr]);
    }
  }, [data]);

  const skeleton = React.useMemo(() => {
    return new Array(12).fill("").map((_, index) => (
      <Grid
        item
        xl={2}
        md={3}
        sm={4}
        xs={6}
        key={"collection-list-skeleton-" + index + 1}
      >
        <BookCardSkeleton imgHeight="300px" />
      </Grid>
    ));
  }, []);

  React.useEffect(() => {
    if (page !== 1) setPage(1);
    return () => {
      setBooks([]);
    };
  }, [tabValue]);

  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {(isFetching && page === 1) || isCategoryLoading
        ? skeleton
        : books.map((book: IBook) => (
            <Grid item xl={2} md={2.4} sm={4} xs={6} key={book._id}>
              <BookCard
                amount={book.amount}
                discounts={get(book, "discounts", [])}
                _id={book._id}
                bookPrice={book.bookPrice}
                imgUrl={book.imgUrl}
                name={book.name}
                state={get(book, "state")}
                author={get(book, "author")}
                genres={get(book, "genres", [])}
                rating={get(book, "rating")}
                rateCount={get(book, "rateCount")}
              />
            </Grid>
          ))}
      {get(data, "data.data.total", 0) - 1 > books.length && !isFetching && (
        <Grid item xl={2} md={3} sm={4} xs={6} key="load-more-image-key">
          <LoadMore
            onClick={loadMore}
            className="load-more-btn"
            ref={loadMoreRef}
          >
            <LazyLoadImage
              src={LoadMoreImage.src}
              className="load-more-image"
              alt="Load more "
            />
          </LoadMore>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(CollectionTabContent);
