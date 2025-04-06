"use client";

import React, { Suspense } from "react";
// import Checkout from "./container/Checkout";
import { Loader } from "@/components";
import dynamic from "next/dynamic";

const CheckoutComponent = dynamic(() => import("./container/Checkout"), {
  ssr: false,
});

const CartCheckoutPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CheckoutComponent />
    </Suspense>
  );
};

export default CartCheckoutPage;
