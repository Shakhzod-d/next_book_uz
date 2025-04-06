"use client";

import React from "react";
import { BOOKMARK_KEY } from "@/contants/storage";
import { LayoutContext } from "@/layout/context";
import { IBookmark } from "@/types/common";
import get from "lodash.get";

const isAvaible = (bookmark: IBookmark[], bookId: string) => {
  return !!bookmark.find(
    (bookmark: IBookmark) => get(bookmark, "_id") === bookId
  );
};

export const useAddBookMark = () => {
  const {
    state: {},
    actions: { setBookmarkCount },
  } = React.useContext(LayoutContext);

  const addBookmark = (book: IBookmark) => {
    const storageBookMark = localStorage.getItem(BOOKMARK_KEY);
    let bookmark: IBookmark[] = storageBookMark
      ? JSON.parse(storageBookMark)
      : [];

    if (!isAvaible(bookmark, get(book, "_id"))) {
      bookmark = [...bookmark, book];
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmark));
      setBookmarkCount(bookmark.length);
      return {
        bookmark,
        isBookmark: true,
      };
    } else {
      const findIndex = bookmark.findIndex(
        (bookmark: IBookmark) => get(bookmark, "_id") === get(book, "_id")
      );
      bookmark.splice(findIndex, 1);
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmark));
      setBookmarkCount(bookmark.length);
      return {
        bookmark,
        isBookmark: false,
      };
    }
  };

  return [addBookmark];
};
