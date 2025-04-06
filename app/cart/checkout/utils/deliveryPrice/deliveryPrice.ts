import { TDeliveryType } from "@/types/common";
import { IDelivery } from "../../context/CheckoutContext.types";

export const deliveryPrice = (
  deliveryType: TDeliveryType,
  deliveryList: IDelivery[]
): number => {
  let deliveryPriceTotal: number = 0;
  if (Array.isArray(deliveryList)) {
    if (deliveryType === "courier") {
      deliveryPriceTotal = deliveryList[0].value;
    } else if (deliveryType === "mail") {
      deliveryPriceTotal = deliveryList[1].value;
    }
  }
  return deliveryPriceTotal;
};
