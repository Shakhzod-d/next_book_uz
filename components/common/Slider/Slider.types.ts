import { IBookCart } from "@/types/common";

export interface ISlider {
  url: string;
  search?: string;
  dataPath?: string;
  title?: string;
  enabled?: boolean;
  setCarts?: React.Dispatch<React.SetStateAction<IBookCart[]>>;
}
