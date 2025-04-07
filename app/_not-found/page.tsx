// app/_not-found/page.tsx
"use client"; // Mark the component as client-side only

import React, { Suspense } from "react";
import { Loader } from "@/components"; // Assuming you have a loader component

// If you're using useSearchParams, ensure it's wrapped in Suspense
import { useSearchParams } from "next/navigation";

const NotFoundPage = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <p>Search Params: {searchParams?.toString()}</p>{" "}
      {/* Example usage of search params */}
    </div>
  );
};

const NotFoundWrapper = () => {
  return (
    <Suspense fallback={<Loader />}>
      {" "}
      {/* Wrap in Suspense */}
      <NotFoundPage />
    </Suspense>
  );
};

export default NotFoundWrapper;
