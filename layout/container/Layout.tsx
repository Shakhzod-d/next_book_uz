"use client";

import React, { Fragment, Suspense, useContext, useEffect } from "react";
// import { Footer, Loader, ScrollToTop, Navbar } from "components";
// import Routes from "routes/container/Routes";
import jwtDecode from "jwt-decode";
// import { LayoutContext } from "layout/context";
// import { IDecodedToken } from "layout/context/LayoutContext.types";
import get from "lodash.get";
import browserStorage from "@/services/storage/browserStorage";
import { IBook } from "@/types/common";
import { IDecodedToken } from "../context/LayoutContext.types";
import { LayoutContext } from "../context";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { BOOKMARK_LIST_LIMIT } from "@/contants/bookMarkListLimit";
import { usePathname } from "next/navigation";
import Auth from "@/components/shared/Auth/container/Auth";
import { Footer, Loader, Navbar, ScrollToTop } from "@/components";
// import { totalDiscount } from "utils/totalDiscount/totalDiscount";
// import browserStorage from "services/storage/browserStorage";
// import { REQUEST_STATUS } from "hooks/useRequest/useRequest.constants";
// import { BOOKMARK_LIST_LIMIT } from "pages/bookmark/contants/BookmarkList";
// import { IBook, IBookCart, IShoppingCard } from "types/common";
// import Auth from "components/shared/Auth/container/Auth";

const Layout = () => {
  // const { pathname } = useLocation();
  const pathname = usePathname();
  const token: string | undefined | null = browserStorage.get("token");

  // const storageCarts = localStorage.getItem("carts");
  // const [carts, setCarts] = React.useState<IBookCart[]>(
  // storageCarts ? (JSON.parse(storageCarts) as IBookCart[]) : []
  // );

  useEffect(() => {
    try {
      if (token) {
        const decodedToken: IDecodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (error: any) {
      if (error.message) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (token) {
      getBookmarkList(BOOKMARK_LIST_LIMIT);
      getProfile();
    }
  }, []);

  const {
    state: {
      // shoppingCardList,
      bookmarkListByStorage,
      getProfileState: { getProfileResponse, getProfileStatus },
      authOpen,
    },

    actions: {
      // setShoppingCardList,
      getBookById,
      setBookmarkListByStorage,
      getProfile,
      setUser,
      getBookmarkList,
      setAuthOpen,
    },
  } = useContext(LayoutContext);

  useEffect(() => {
    updateLocalShoppingCardList();
    updateLocalBookmarkList();
  }, []);

  useEffect(() => {
    if (getProfileStatus === REQUEST_STATUS.success) {
      setUser(get(getProfileResponse, "data"));
    }
  }, [getProfileStatus]);

  const updateLocalShoppingCardList = async () => {
    // try {
    //   let newShoppingCardList: IBookCart[] = [];
    //   for (const shoppingCard of carts) {
    //     const res = await getBookById(shoppingCard._id);
    //     const newShoppingCard: IBookCart = {
    //       ...shoppingCard,
    //       _id: res._id,
    //       maxAmount: get(res, "amount", 0),
    //       bookPrice: get(res, "bookPrice", 0),
    //       cover: get(res, "cover", ""),
    //       imgUrl: get(res, "imgUrl", ""),
    //       name: get(res, "name", ""),
    //     };
    //     newShoppingCardList = newShoppingCardList.concat(newShoppingCard);
    //   }
    //   browserStorage.set("carts", newShoppingCardList);
    //   // setShoppingCardList(newShoppingCardList);
    // } catch (err: any) {
    //   console.log(err);
    //   return [];
    // }
  };

  const updateLocalBookmarkList = async () => {
    try {
      let newBookmarkList: IBook[] = [];
      for (const bookmark of bookmarkListByStorage) {
        const res = await getBookById(bookmark._id);
        const newBookmark: IBook = {
          ...res,
        };
        newBookmarkList = newBookmarkList.concat(newBookmark);
      }
      setBookmarkListByStorage(newBookmarkList);
      browserStorage.set("bookmarkListByStorage", newBookmarkList);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Auth />
    </>
  );
};

export default Layout;
