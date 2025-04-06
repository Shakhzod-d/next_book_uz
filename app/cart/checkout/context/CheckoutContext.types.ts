import { TAddEditRequestMetod } from "@/services/api/client.types";
import { TPaymentType } from "@/types/common";

export interface useCheckout {
  state: {
    addOrderState: {
      addOrderResponse: any;
      addOrderStatus: TAddEditRequestMetod;
      addOrderError: any;
    };
  };
  actions: { addOrder: (addOrderRequest: IAddOrderRequest) => void };
}

export type TShipping = "curier" | "mail";

export interface IOrder {
  bookId: string;
  type?: string;
  quantity: number;
}

export interface IAddOrderRequest {
  paymentType: TPaymentType;
  type?: string;
  shippingType: TShipping;
  address: {
    address: string;
    latitude: number;
    longitude: number;
  };
  orderItems: IOrder[];
}

export interface IDelivery {
  createdAt: string;
  isDeleted: boolean;
  type: "courier" | "mail";
  updatedAt: string;
  value: number;
  _id: string;
}

export interface IRegion {
  name: string;
  paymentTypes: TPaymentType[];
  _id: string;
}

export interface IDistrict {
  name: string;
  _id: string;
}
