import React, { Fragment } from "react";
import BookDetailsProvider from "../context/BookDetailsProvider";
import BookDetails from "./BookDetails";

const Index = () => {
  return (
    <BookDetailsProvider>
      <BookDetails />
    </BookDetailsProvider>
  );
};

export default Index;
