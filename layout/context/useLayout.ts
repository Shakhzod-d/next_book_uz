"use client";

import React, { useState } from "react";
import { BOOKMARK_LIST_LIMIT } from "@/contants/bookMarkListLimit";
import { BOOKMARK_KEY, MODE, SHOPPING_CART_KEY } from "@/contants/storage";
import { useRequest } from "@/hooks/useRequest/useRequest";
import browserStorage from "@/services/storage/browserStorage";
import { IBook, IUser } from "@/types/common";
import "firebase/messaging";

import get from "lodash.get";

export const useLayout = () => {
  const isClient = typeof window !== "undefined";
  const defaultCart = isClient
    ? window.localStorage.getItem(SHOPPING_CART_KEY)
    : null;
  const defaultBookmark = isClient
    ? window.localStorage.getItem(BOOKMARK_KEY)
    : null;

  const defaultMode = isClient ? localStorage.getItem(MODE) : "light";
  const [authOpen, setAuthOpen] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(
    isClient ? !!localStorage.getItem("token") : false
  );
  const [cartCount, setCartCount] = React.useState(
    defaultCart ? get(JSON.parse(defaultCart), "length") : 0
  );
  const [bookmarkCount, setBookmarkCount] = React.useState(
    defaultBookmark ? get(JSON.parse(defaultBookmark), "length") : 0
  );

  const [mode, setMode] = useState(defaultMode ? defaultMode : "light");

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userLoaclStorage = browserStorage.get<string | undefined | null>(
    "user"
  );

  const bookmarkListTotalStorage = browserStorage.get<
    string | undefined | null
  >("bookmarkListTotal");

  let defaultBookmarkList = browserStorage.get<string>("bookmarkListByStorage");

  const [bookmarkListByApi, setBookmarkListByApi] = useState<IBook[]>([]);

  const [bookmarkListTotal, setBookmarkListTotal] = useState<number>(
    bookmarkListTotalStorage ? JSON.parse(bookmarkListTotalStorage) : 0
  );

  const [user, setUser] = useState<IUser | undefined>(
    userLoaclStorage ? JSON.parse(userLoaclStorage) : undefined
  );

  const [bookmarkListByStorage, setBookmarkListByStorage] = useState<IBook[]>(
    defaultBookmarkList ? JSON.parse(defaultBookmarkList) : []
  );

  const [
    getBookmarkListClient,
    getBookmarkListResponse,
    getBookmarkListStatus,
    getBookmarkListError,
  ] = useRequest();

  const [
    getBookByIdClient,
    getBookByIdData,
    getBookByIdStatus,
    getBookByIdError,
  ] = useRequest();

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

  const [
    getProfileClient,
    getProfileResponse,
    getProfileStatus,
    getProfileError,
  ] = useRequest();

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

  const getBookmarkList = async (limit: number = BOOKMARK_LIST_LIMIT) => {
    const token = browserStorage.get<string | undefined | null>("token");
    if (token) {
      try {
        await getBookmarkListClient.get(`bookmark?page=1&limit=${limit}`);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const getBookById = async (id: string) => {
    try {
      if (id) {
        const res = await getBookByIdClient.get(`book/${id}`);
        if (res?.data) return res?.data;
        else return null;
      }
    } catch (err: any) {
      console.log(err);
      return null;
    }
  };

  const getProfile = async () => {
    await getProfileClient.get("profile");
  };

  return {
    state: {
      getBookmarkListState: {
        getBookmarkListResponse,
        getBookmarkListStatus,
        getBookmarkListError,
      },
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
      getBookByIdStates: {
        getBookByIdData,
        getBookByIdStatus,
        getBookByIdError,
      },
      getProfileState: {
        getProfileResponse,
        getProfileStatus,
        getProfileError,
      },
      user,
      bookmarkListByStorage,
      bookmarkListTotal,
      bookmarkListByApi,
      authOpen,
      isAuth,
      bookmarkCount,
      cartCount,
      mode,
    },
    actions: {
      setBookmarkCount,
      setCartCount,
      setUser,
      setBookmarkListByStorage,
      getBookmarkList,
      setBookmarkListByApi,
      setBookmarkListTotal,
      addFavouriteBook,
      deleteFavouriteBook,
      getBookById,
      getProfile,
      setAuthOpen,
      setIsAuth,
      setMode,
    },
  };
};
