import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";
import { IBaseResponsePagin } from "@/services/api/client.types";
import { IUser, TOrderStatus } from "@/types/common";

export interface IUseProfile {
  state: {
    getProfileState: {
      getProfileResponse: any;
      getProfileStatus: TApiResponseStatus;
      getProfileError: any;
    };
    updateProfileState: {
      updateProfileResponse: any;
      updateProfileStatus: TApiResponseStatus;
      updateProfileError: any;
    };
    userUploadImageState: {
      userImageUploadResponse: any;
      userImageUploadStatus: TApiResponseStatus;
      userImageUploadError: any;
    };
    getOrdersState: {
      getOrdersResponse: IBaseResponsePagin<IOrder[]>;
      getOrdersStatus: TApiResponseStatus;
      getOrdersError: any;
    };
    updateUserImageState: {
      updateUserImageResponse: any;
      updateUserImageStatus: TApiResponseStatus;
      updateUserImageError: any;
    };
  };
  actions: {
    getProfile: () => void;
    updateProfile: (data: IUpdateProfile) => void;
    userUploadImage: (formData: any) => void;
    logout: () => void;
    getOrders: () => void;
    updateUserImage: (data: any) => void;
  };
}

export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  email: string;
  biography: string;
}

export interface IOrder {
  deliveryPrice?: number;
  deliveryType?: string;
  isPaid?: boolean;
  number: number;
  paymentType?: string;
  status: TOrderStatus;
  total: number;
  totalDiscount: number;
  totalPrice: number;
  type?: string;
  user?: IUser;
  createdAt?: string;
  UpdatedAt?: string;
  _id: string;
}
