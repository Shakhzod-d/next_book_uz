import { IBook } from "@/types/common";

export interface IBookDetails {
  book: IBook;
  isLoading: boolean;
  status: string;
}
