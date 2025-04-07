// "use client";

// import React, { Suspense } from "react";
// import { Loader } from "@/components";

// import dynamic from "next/dynamic";

// const BookmarkList = dynamic(() => import("./container"), { ssr: false });

// import { useSearchParams } from "next/navigation";

// export const BookmarkPage = () => {
//   const searchParams = useSearchParams();

//   // Your component logic and JSX here...

//   return (
//     <div>
//       {/* Render your bookmark content */}
//       <p>Search Params: {searchParams?.toString()}</p>
//     </div>
//   );
// };

// const BookMarkPage = () => {
//   return (
//     <Suspense fallback={<Loader />}>
//       <BookmarkList />
//     </Suspense>
//   );
// };

// export default BookMarkPage;

"use client";

import React, { Suspense } from "react";
import { Loader } from "@/components";

// Dynamically import BookmarkList with SSR disabled
import dynamic from "next/dynamic";
const BookmarkList = dynamic(() => import("./container"), { ssr: false });

import { useSearchParams } from "next/navigation";

// Your component logic
const BookmarkPage = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <p>Search Params: {searchParams?.toString()}</p>
      {/* Render your bookmark content */}
      <Suspense fallback={<Loader />}>
        <BookmarkList />
      </Suspense>
    </div>
  );
};

// Export as default
export default BookmarkPage;
