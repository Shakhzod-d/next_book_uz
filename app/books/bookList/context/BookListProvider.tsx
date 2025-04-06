"use client";

import React from "react";
import { BookListContext } from ".";
import { useBookList } from "./useBookList";

const BookListProvider = ({ children }: any) => {
  const value = useBookList();
  return (
    <BookListContext.Provider value={value}>
      {children}
    </BookListContext.Provider>
  );
};

export default BookListProvider;
