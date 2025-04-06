import { IDiscount } from "@/types/common";

export const totalDiscount = (discountList: IDiscount[], bookPrice: number) => {
  let totalDiscountPrice: number = 0;
  discountList?.forEach((discount: IDiscount) => {
    if (discount.applyType === "cash") {
      totalDiscountPrice += discount.value;
    } else if (discount.applyType === "percent") {
      totalDiscountPrice += (discount.value * bookPrice) / 100;
    }
  });
  return totalDiscountPrice;
};
