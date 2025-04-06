import { TDeliveryType } from "@/types/common";

export const ROAD_TO_PURCHASE_KEY = "BOOK_DETAILS";

export const DELIVERY_TYPE_OPTIONS: {
  _id: TDeliveryType;
  label: string;
}[] = [
  {
    _id: "courier",
    label: "CHECKOUT.COURIER",
  },
  {
    _id: "mail",
    label: "CHECKOUT.MAIL",
  },
  {
    _id: "pickup",
    label: "CHECKOUT.PICKUP",
  },
];
