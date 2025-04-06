import { TAuthState } from "../../container/Auth";

export interface ISignUpRequest {
  [field: string]: string;
}

export interface ISignUp {
  setState: React.Dispatch<React.SetStateAction<TAuthState>>;
}
