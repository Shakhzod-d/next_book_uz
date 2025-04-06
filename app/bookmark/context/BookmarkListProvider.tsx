"use client";

import React from "react";
import BookmarkListContext from "./BookmarkListContext";
import { useBookmarkList } from "./useBookmarkList";

const BookmarkListProvider = ({ children }: any) => {
  const value = useBookmarkList();
  return (
    <BookmarkListContext.Provider value={value}>
      {children}
    </BookmarkListContext.Provider>
  );
};

export default BookmarkListProvider;
