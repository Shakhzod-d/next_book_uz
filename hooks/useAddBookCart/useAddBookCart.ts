"use client";

import get from "lodash.get";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import React from "react";
import { LayoutContext } from "@/layout/context";
import { IBookCart } from "@/types/common";
import { SHOPPING_CART_KEY } from "@/contants/storage";
import browserStorage from "@/services/storage/browserStorage";
import { ERROR_MESSAGES } from "@/contants/errors";

const isAvaible = (carts: any[], bookId: string) => {
  return !!carts.find((cart: any) => get(cart, "_id") === bookId);
};

export const useAddBookCart = () => {
  const { t } = useTranslation();
  const {
    state: {},
    actions: { setCartCount },
  } = React.useContext(LayoutContext);

  const addBook = (book: IBookCart) => {
    if (book.amount === 0) {
      toast.error(t("DETAILS.NOT_AVAILABLE"));
      return;
    }
    let carts: any = localStorage.getItem(SHOPPING_CART_KEY);
    carts = carts ? JSON.parse(carts) : [];

    if (!isAvaible(carts, get(book, "_id"))) {
      carts = [...carts, book];
      browserStorage.set(SHOPPING_CART_KEY, carts);
      toast.success(t(ERROR_MESSAGES[705]));
    } else {
      toast.error(t(ERROR_MESSAGES[706]));
    }
    setCartCount(carts.length);
    return carts.length;
  };

  return [addBook];
};
