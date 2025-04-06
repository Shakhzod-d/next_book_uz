import React from "react";
import ShoppingCardListContext from "./ShoppingCardListContext";
import { useShoppingCardList } from "./useShoppingCardList";

const ShoppingCardListProvider = ({ children }: any) => {
  const value = useShoppingCardList();
  return (
    <ShoppingCardListContext.Provider value={value}>
      {children}
    </ShoppingCardListContext.Provider>
  );
};

export default ShoppingCardListProvider;
