import { IShoppingCard } from "@/types/common";

export const totalPriceFunction = (shoppingCardList: IShoppingCard[]) => {
  const initialValue = 0;
  const totalPrice = shoppingCardList.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue.amount *
        (currentValue.bookPrice - currentValue.totalDiscount),
    initialValue
  );
  return totalPrice;
};
