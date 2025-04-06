import { IBook } from "@/types/common";

export interface IBookImagesCarousel {
  book: IBook;
  isLoading: boolean;
  status: string;
}
