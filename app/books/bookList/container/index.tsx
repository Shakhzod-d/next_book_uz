// "use client";

// import React from "react";
// import BookList from "./BookList";

// const index = () => {
//   return (
//     // <BookListProvider>
//     <BookList />
//     // </BookListProvider>
//   );
// };

// export default index;

"use client";

import React, { Suspense } from "react";
import BookList from "./BookList";
import { Loader } from "@/components";

const Index = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BookList />
    </Suspense>
  );
};

export default Index;
