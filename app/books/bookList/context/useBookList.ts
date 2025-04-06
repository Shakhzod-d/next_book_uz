"use client";

import get from "lodash.get";
import { useCustomSearchParams } from "@/hooks";
import { useRequest } from "@/hooks/useRequest/useRequest";
import axios from "axios";
import React from "react";
import { usePathname } from "next/navigation";

export const useBookList = () => {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const [
    addFavoriteBookClient,
    addFavouriteBookResponse,
    addFavouriteBookStatus,
    addFavouriteBookError,
  ] = useRequest();

  const [
    deleteFavouriteBookClient,
    deleteFavouriteBookRes,
    deleteFavouriteBookStatus,
    deleteFavouriteBookError,
  ] = useRequest();

  const baseUrl = React.useMemo(() => {
    return pathname.includes("/books") || pathname.includes("/discounts")
      ? "book"
      : pathname.includes("/packages")
      ? "collection"
      : pathname.includes("/discounts")
      ? "discount"
      : "";
  }, [pathname]);

  const hasDiscount = React.useMemo(
    () => (pathname.includes("/discounts") ? "hasDiscount=true" : ""),
    [pathname]
  );

  const getBookList = async (props: any) => {
    try {
      const res = await axios.get(
        `${baseUrl + "?" + get(props, "queryKey[1]", "")}${
          hasDiscount ? `&${hasDiscount}` : ""
        }`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const checkboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    allCheckboxId: string
  ) => {
    let ids = (
      Array.isArray(searchParams[event.target.name])
        ? searchParams[event.target.name]
        : typeof searchParams[event.target.name] === "string"
        ? [searchParams[event.target.name]]
        : []
    ) as string[];

    if (!event.target.checked) {
      ids.splice(ids.indexOf(event.target.id), 1);
      setSearchParams({
        ...searchParams,
        [event.target.name]: ids,
        [allCheckboxId]: [],
        page: "1",
      });
    } else {
      setSearchParams({
        ...searchParams,
        [event.target.name]: [...ids, event.target.id],
        page: "1",
      });
    }
  };

  const getGenres = async (props: any) => {
    try {
      const res = await axios.get(
        `genre?page=1&search=${get(props, "queryKey[1]", "")}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getAuthors = async (props: any) => {
    try {
      const res = await axios.get(
        `author?page=1&search=${get(props, "queryKey[1]", "")}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
  const getPublishers = async (props: any) => {
    try {
      const res = await axios.get(
        `publisher?page=1&search=${get(props, "queryKey[1]", "")}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const addFavouriteBook = async (bookId: string) => {
    let addFavouriteBookRequest = {
      bookId,
    };
    await addFavoriteBookClient.post("bookmark", addFavouriteBookRequest);
  };

  const deleteFavouriteBook = async (id: string) => {
    if (id) {
      await deleteFavouriteBookClient.deleteRequest(`bookmark/${id}`);
    }
  };

  return {
    state: {
      addFavouriteBookState: {
        addFavouriteBookResponse,
        addFavouriteBookStatus,
        addFavouriteBookError,
      },
      deleteFavouriteBookState: {
        deleteFavouriteBookRes,
        deleteFavouriteBookStatus,
        deleteFavouriteBookError,
      },
    },
    actions: {
      getBookList,
      getGenres,
      getAuthors,
      getPublishers,
      addFavouriteBook,
      deleteFavouriteBook,
      checkboxChange,
    },
  };
};
