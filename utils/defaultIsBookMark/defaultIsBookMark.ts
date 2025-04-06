"use client";

import { BOOKMARK_KEY } from "@/contants/storage";
import { IBookmark } from "@/types/common";
import get from "lodash.get";

export const defaultIsBookmark = (_id: string) => {
  if (typeof window === "undefined") {
    // If running on the server, return a default value (e.g., false or null)
    return false;
  }

  const storageBookMark = localStorage.getItem(BOOKMARK_KEY);
  if (!storageBookMark) return;
  return !!(JSON.parse(storageBookMark) as IBookmark[])?.find(
    (bookmark) => get(bookmark, "_id") === _id
  );
};
