"use client";

import React, { useCallback } from "react";
import { Grid } from "@mui/material";
import { BasketCard, PayCheck } from "../components";
import { MainContent } from "@/app/style/home";
import { IBookCart } from "@/types/common";
import browserStorage from "@/services/storage/browserStorage";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { SHOPPING_CART_KEY } from "@/contants/storage";
import { useTranslation } from "react-i18next";
import { DataNotFound, Slider } from "@/components";
import { useQueryBuilder } from "@/hooks";
import { LayoutContext } from "@/layout/context";
import get from "lodash.get";

const ShoppingCardListPage = () => {
  const { t } = useTranslation();
  const [search, queryConvert] = useQueryBuilder("genreIds");
  const storageCarts = localStorage.getItem(SHOPPING_CART_KEY);
  const [carts, setCarts] = React.useState<IBookCart[]>(
    storageCarts ? (JSON.parse(storageCarts) as IBookCart[]) : []
  );

  const {
    state: {},
    actions: { setCartCount },
  } = React.useContext(LayoutContext);

  const decrement = useCallback(
    (bookId: string) => {
      const findIndex = carts.findIndex((book) => book._id === bookId);
      if (findIndex >= 0 && carts[findIndex].amount > 1) {
        carts[findIndex].amount--;
      }

      setCarts([...carts]);
      browserStorage.set(SHOPPING_CART_KEY, [...carts]);
    },
    [carts, setCarts]
  );

  const increment = useCallback(
    (bookId: string) => {
      const findIndex = carts.findIndex((book) => book._id === bookId);
      if (findIndex >= 0) {
        if (carts[findIndex].amount < carts[findIndex].maxAmount)
          carts[findIndex].amount++;
      }

      setCarts([...carts]);
      browserStorage.set(SHOPPING_CART_KEY, [...carts]);
    },
    [carts, setCarts]
  );

  const deleteCart = useCallback(
    (bookId: string) => {
      const findIndex = carts.findIndex((book) => book._id === bookId);
      if (findIndex >= 0) {
        carts.splice(findIndex, 1);
      }
      setCarts([...carts]);
      browserStorage.set(SHOPPING_CART_KEY, [...carts]);
      setCartCount(carts.length);
    },
    [carts, setCarts]
  );

  const genreIdsSearch = React.useMemo(() => {
    const genreIds: string[] = carts.reduce(
      (sum: string[], cart: IBookCart) =>
        sum.concat(get(cart, "genres", []).map((genre) => get(genre, "_id"))),
      []
    );
    queryConvert(genreIds);
  }, []);

  React.useEffect(() => {
    scrollToDefault();
  }, []);

  return (
    <MainContent className="container mb-5">
      <div className="main-page-title mb-3">{t("BASKET.BASKET")}</div>
      <div className="mb-3">
        <Grid container columnSpacing={3}>
          <Grid item xs={12} md={9} sm={12}>
            {carts.length !== 0 ? (
              carts?.map((bookCart: IBookCart) => {
                return (
                  <div className="mb-3" key={bookCart._id}>
                    <BasketCard
                      {...{
                        bookCart,
                        decrement,
                        increment,
                        deleteCart,
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <Grid xs={12}>
                <DataNotFound title="COMMON.PRODUCT_NOT_FOUND" />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} md={3} sm={12}>
            <PayCheck carts={carts} />
          </Grid>
        </Grid>
      </div>
      <div className="pt-5">
        <Slider url="book" search={search} title="" setCarts={setCarts} />
      </div>
    </MainContent>
  );
};

export default ShoppingCardListPage;
