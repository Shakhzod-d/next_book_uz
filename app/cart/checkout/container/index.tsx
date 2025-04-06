import React from "react";
import CheckoutProvider from "../context/CheckoutProvider";
import Payment from "./Checkout";
import BasketProvider from "../../context/BasketProvider";

const Index = () => {
  return (
    <CheckoutProvider>
      <BasketProvider>
        <Payment />
      </BasketProvider>
    </CheckoutProvider>
  );
};

export default Index;
