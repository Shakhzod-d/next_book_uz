"use client";

import { Loader } from "@/components";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const News = dynamic(() => import("./list/News"), { ssr: false });

const NewsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <News />
    </Suspense>
  );
};

export default NewsPage;
