"use client";

import React, { Suspense, useEffect, useState } from "react";
import BookmarkListProvider from "../context/BookmarkListProvider";
import dynamic from "next/dynamic";
import { Loader } from "@/components";
const BookmarkList = dynamic(() => import("./BookmarkList"), { ssr: false });

const index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <BookmarkListProvider>
      <Suspense fallback={<Loader />}>
        <BookmarkList />
      </Suspense>
    </BookmarkListProvider>
  );
};

export default index;
