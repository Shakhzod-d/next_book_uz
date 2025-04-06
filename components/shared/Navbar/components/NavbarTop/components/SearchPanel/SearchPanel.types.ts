import { IBook } from "@/types/common";

export interface IBookList {
  data: IBook[];
  isLoading: boolean;
  total: number;
  onClose: () => void;
  search: string;
}
