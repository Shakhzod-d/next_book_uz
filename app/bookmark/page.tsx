"use client";

import React, { Suspense } from "react";
import { Loader } from "@/components";

import dynamic from "next/dynamic";

const BookmarkList = dynamic(() => import("./container"), { ssr: false });

const BookMarkPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BookmarkList />
    </Suspense>
  );
};

export default BookMarkPage;
