import { IParam } from "./Sorting.types";

export const SORT_LIST: { title: string; params: IParam }[] = [
  {
    title: "BOOKS.SORTING",
    params: {
      sortBy: [],
      asc: "-1",
    },
  },
  {
    title: "BOOKS.NEW_BOOKS",
    params: {
      sortBy: "createdAt",
      asc: "-1",
    },
  },
  {
    title: "BOOKS.CHEAPER",
    params: {
      sortBy: "fromPrice",
      asc: "1",
    },
  },
  {
    title: "BOOKS.MORE_EXPENSIVE",
    params: {
      sortBy: "fromPrice",
      asc: "-1",
    },
  },
  {
    title: "BOOKS.RATING_HIGHT",
    params: {
      sortBy: "rating",
      asc: "-1",
    },
  },
];
