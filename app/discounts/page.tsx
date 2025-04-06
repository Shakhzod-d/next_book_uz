"use client";

import { Loader } from "@/components";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// import BookList from "../books/bookList/container/BookList"; MUST CHECK
const BookList = dynamic(() => import("../books/bookList/container/BookList"), {
  ssr: false,
});

const DiscountsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Suspense fallback={<Loader />}>
        <BookList />
      </Suspense>
    </Suspense>
  );
};

export default DiscountsPage;
