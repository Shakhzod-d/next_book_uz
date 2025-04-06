"use client";

import React, { Suspense } from "react";
import { Loader } from "@/components";
import dynamic from "next/dynamic";

const Successful = dynamic(() => import("./container/Successful"), {
  ssr: false,
});

const SuccessfulPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Successful />
    </Suspense>
  );
};

export default SuccessfulPage;
