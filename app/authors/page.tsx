"use client";

import React, { Suspense } from "react";
// import AuthorList from "./list/container";
import { Loader } from "@/components";
import dynamic from "next/dynamic";

const AuthorList = dynamic(() => import("./list/container"), { ssr: false });

const AuthorsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthorList />;
    </Suspense>
  );
};

export default AuthorsPage;
