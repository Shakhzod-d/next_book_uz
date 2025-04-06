import BasketContext from "./BasketContext";
import { useBasket } from "./useBasket";

const BasketDetailsProvider = ({ children }: any) => {
  const value = useBasket();
  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};

export default BasketDetailsProvider;
