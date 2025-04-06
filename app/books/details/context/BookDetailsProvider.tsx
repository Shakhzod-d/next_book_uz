import React from "react";
import BookDetailsContext from "./BookDetailsContext";
import { useBookDetails } from "./useBookDetails";

const BookDetailsProvider = ({ children }: any) => {
  const value = useBookDetails();
  return (
    <BookDetailsContext.Provider value={value}>
      {children}
    </BookDetailsContext.Provider>
  );
};

export default BookDetailsProvider;
