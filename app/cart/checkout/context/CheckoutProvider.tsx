import React from "react";
import CheckoutContext from "./CheckoutContext";
import { useCheckout } from "./useCheckout";

const CheckoutProvider = ({ children }: any) => {
  const value = useCheckout();
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
