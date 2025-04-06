import { IRegion } from "../../context/CheckoutContext.types";

export interface IPayment {
  payType: string;
  setPayType: React.Dispatch<React.SetStateAction<string>>;
  cardType: string;
  setCardType: React.Dispatch<React.SetStateAction<string>>;
  region?: IRegion;
}
