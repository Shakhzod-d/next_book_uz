import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookCard, BookCardSkeleton } from "@/components";
import get from "lodash.get";
import { LoadMore } from "@/app/components/Collection/components/CollectionTabContent/CollectionTabContent.style";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { IBook } from "@/types/common";
import LoadMoreImage from "assets/images/LoadMore.png";
import { AuthorBooksStyled } from "./AuthorBooks.style";
import Image from "next/image";

const AuthorBooks = () => {
  const { t } = useTranslation();
  const { id: authorId } = useParams();
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);

  const loadMore = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const getBooksByAuthorIds = async (page: number, authorId?: string) => {
    try {
      const response = await axios.get(
        `book?page=${page}&limit=12&authorIds=${authorId}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const sliceBooks = () => {
    if (get(data, "data.data.total", 0) > books.length)
      return books.slice(0, -1);
    return books;
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["getBooksByAuthorId", page, authorId],
    queryFn: () => getBooksByAuthorIds(page, authorId),
    // keepPreviousData: true,
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

  return (
    <AuthorBooksStyled className="mb-3">
      {isLoading ? (
        <Skeleton
          className="main-page-title mb-3"
          variant="text"
          width="200px"
        />
      ) : (
        <div className="main-page-title mb-3">{t("AUTHOR.AUTHOR_BOOKS")}</div>
      )}
      <Grid container columnSpacing={2} rowSpacing={3}>
        {isLoading
          ? skeleton
          : sliceBooks().map((book: IBook) => (
              <Grid item xl={2} md={3} sm={4} xs={6} key={book._id}>
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
                />
              </Grid>
            ))}
        {get(data, "data.data.total", 0) > books.length && !isFetching && (
          <Grid item xl={2} md={3} sm={4} xs={6} key="load-more-image-key">
            <LoadMore onClick={loadMore}>
              <Image
                src={LoadMoreImage}
                className="load-more-image"
                alt="Load more "
              />
            </LoadMore>
          </Grid>
        )}
      </Grid>
    </AuthorBooksStyled>
  );
};

export default AuthorBooks;
