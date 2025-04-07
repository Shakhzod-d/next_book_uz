// "use client";

// import React, { Suspense } from "react";
// import { Loader } from "@/components";
// import AuthorClientWrapper from "./AuthorClientWrapper";

// const AuthorsPage = () => {
//   return (
//     <Suspense fallback={<Loader />}>
//       <AuthorClientWrapper />
//     </Suspense>
//   );
// };

// export default AuthorsPage;

// app/authors/page.tsx
"use client"; // Mark this file as a client-side component

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@/components";

// Your component that uses useSearchParams()
const AuthorList = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <p>Search Params: {searchParams?.toString()}</p>
      {/* Render your author list or related content here */}
    </div>
  );
};

const AuthorsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthorList />
    </Suspense>
  );
};

export default AuthorsPage;
