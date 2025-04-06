import { TAuthState } from "../../container/Auth";

export interface IVerify {
  setState: React.Dispatch<React.SetStateAction<TAuthState>>;
  onClose: () => void;
}
