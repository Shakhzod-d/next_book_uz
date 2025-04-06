import { IBookCart } from "@/types/common";

export interface IPaymentCheck {
  deliveryType: string;
  orderInfoData: any;
  isLoading: boolean;
  carts: IBookCart[];
  isSubmitting: boolean;
}
