import { TDeliveryType, TPaymentType } from "@/types/common";

export interface IOrderInfo {
  deliveryType: TDeliveryType;
  address: string;
  paymentType: TPaymentType;
  totalPrice: number;
  deliveryPrice: number;
  isLoading: boolean;
  comment: string;
  isPaid: boolean;
}
