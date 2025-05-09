"use client";

import React, { Suspense } from "react";
import { Loader } from "@/components";
import dynamic from "next/dynamic";

const BookList = dynamic(() => import("./bookList/container"), { ssr: false });

const BooksPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BookList />
    </Suspense>
  );
};

export default BooksPage;
