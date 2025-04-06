import { TAuthState } from "../../container/Auth";

export interface ILogin {
  setState: React.Dispatch<React.SetStateAction<TAuthState>>;
}
