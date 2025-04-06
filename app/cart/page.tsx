"use client";

import React, { Suspense } from "react";
// import ShoppingCardListPage from "./shoppingCardList/container";
import { Loader } from "@/components";
import dynamic from "next/dynamic";

const ShoppingCardListPage = dynamic(
  () => import("./shoppingCardList/container"),
  {
    ssr: false,
  }
);

const CartPage = () => {
  return <ShoppingCardListPage />;
};

export default CartPage;
