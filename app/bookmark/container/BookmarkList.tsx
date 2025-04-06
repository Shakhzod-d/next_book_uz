"use client";

import { Grid } from "@mui/material";
import { DataNotFound } from "@/components";
import { BOOKMARK_KEY } from "@/contants/storage";
import { LayoutContext } from "@/layout/context";
import get from "lodash.get";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IBookmark } from "@/types/common";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { BookCard } from "../components";
import { BookMarkListStyled } from "./BookMarkList.style";

const BookmarkList = () => {
  const { t } = useTranslation();
  // const storageBookmark = localStorage.getItem(BOOKMARK_KEY);
  // const [bookmark, setBookmark] = React.useState(
  // (storageBookmark ? JSON.parse(storageBookmark) : []) as IBookmark[]
  // );
  const [bookmark, setBookmark] = React.useState<IBookmark[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const {
    state: {},
    actions: { setBookmarkCount },
  } = React.useContext(LayoutContext);

  useEffect(() => {
    setMounted(true);

    const storageBookmark = localStorage.getItem(BOOKMARK_KEY);
    const parsed = storageBookmark ? JSON.parse(storageBookmark) : [];
    setBookmark(parsed);

    // Scroll to default position
    scrollToDefault();
  }, []);

  useEffect(() => {
    if (mounted) {
      scrollToDefault();
    }
  }, [mounted]);

  const deleteBookmark = (_id: string) => {
    const findIndex = bookmark.findIndex((book) => get(book, "_id") === _id);
    bookmark.splice(findIndex, 1);
    setBookmark([...bookmark]);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmark]));
    setBookmarkCount(bookmark.length);
  };

  if (!mounted) return null;

  return (
    <BookMarkListStyled className="container">
      <div className="main-page-title mb-3">{t("BOOKMARK.TITLE")}</div>
      <Grid
        container
        rowSpacing={{ md: 3, sm: 2, xs: 2 }}
        columnSpacing={{ md: 3, sm: 2, xs: 2 }}
      >
        {bookmark.length !== 0 ? (
          bookmark.map((bookmark) => (
            <Grid item xl={2} md={3} sm={4} xs={6} key={get(bookmark, "_id")}>
              <BookCard {...{ ...bookmark, deleteBookmark }} />
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <DataNotFound title="COMMON.PRODUCT_NOT_FOUND" />
          </Grid>
        )}
      </Grid>
    </BookMarkListStyled>
  );
};

export default BookmarkList;
