import React from "react";
import { IBookCart, TDeliveryType } from "@/types/common";
import { IRegion } from "../../context/CheckoutContext.types";

export interface IDeliveryOption {
  _id: TDeliveryType;
  label: string;
}

export type TPayType = "cash" | "card";

export interface IPaymentForm {
  deliveryType: string;
  setdeliveryType: React.Dispatch<React.SetStateAction<string>>;
  orderInfoData: any;
  setPromokod: React.Dispatch<React.SetStateAction<string>>;
  carts: IBookCart[];
  promokod: string;
  region: undefined | IRegion;
  setRegion: React.Dispatch<React.SetStateAction<IRegion | undefined>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
