"use client";

import React, { Suspense } from "react";
import AuthorList from "./AuthorList";
import { Loader } from "@/components";

const Index = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthorList />
    </Suspense>
  );
};

export default Index;
