"use client";

import React, { Suspense } from "react";
import ShoppingCardListProvider from "../context/ShoppingCardListProvider";
import Basket from "./ShoppingCardListPage";
import BasketProvider from "../../context/BasketProvider";
import { Loader } from "@/components";

const Index = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ShoppingCardListProvider>
        <BasketProvider>
          <Basket />
        </BasketProvider>
      </ShoppingCardListProvider>
    </Suspense>
  );
};

export default Index;
