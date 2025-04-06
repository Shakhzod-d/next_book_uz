"use client";

import React, { FC } from "react";
import { Grid, Skeleton } from "@mui/material";
import { BookCardSkeleton, DataNotFound } from "@/components";
import { PageTitle } from "../../../orders/container/Orders.style";
import { useTranslation } from "react-i18next";
import { PurchaseBooksStyled } from "./PurchaseBooks.style";
import { IBook } from "@/types/common";
import PurchaseBook from "../PurchaseBook/PurchaseBook";

const PurchasedBooks: FC<{ books: IBook[]; isLoading: boolean }> = ({
  books = [],
  isLoading,
}) => {
  const { t } = useTranslation();

  const skleton = React.useMemo(() => {
    return new Array(10).fill("", 0, 12).map((_: unknown, i) => (
      <Grid
        item
        lg={2.4}
        md={3}
        sm={4}
        xs={6}
        key={"mine-book-skeleton" + i + 1}
      >
        <BookCardSkeleton imgHeight="260px" />
      </Grid>
    ));
  }, []);

  return (
    <PurchaseBooksStyled>
      {isLoading ? (
        <Skeleton variant="text" width="200px" height="30px" />
      ) : (
        <PageTitle className="mb-3">{t("PROFILE.PURCHASED_BOOKS")}</PageTitle>
      )}

      <Grid container spacing={3}>
        {isLoading ? (
          skleton
        ) : books.length !== 0 ? (
          books?.map((book: any) => {
            return (
              <Grid item lg={2.4} md={3} sm={4} xs={6} key={book._id}>
                <PurchaseBook book={book} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <DataNotFound title="COMMON.PRODUCT_NOT_FOUND" />
          </Grid>
        )}
      </Grid>
    </PurchaseBooksStyled>
  );
};

export default PurchasedBooks;
