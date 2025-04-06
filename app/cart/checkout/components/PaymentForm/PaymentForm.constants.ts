import { IDeliveryOption } from "./PaymentForm.types";

export const FORM_NAMES = {
  firstName: "firstName",
  lastName: "lastName",
  phoneNumber: "phoneNumber",
  populationPoints: "populationPoints",
  address: "address",
  additional: "additional",
  paymentType: "paymentType",
  deliveryType: "deliveryType",
  region: "regionId",
  district: "districtId",
};

export const DEFAULT_LOCATION: number[] = [41.311158, 69.279737];

export const LOCATION_ERROR_MESSAGE: string = "Please enter your location";
