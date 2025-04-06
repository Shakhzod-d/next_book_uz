import { IBookCart } from "@/types/common";

export interface IBasketCardProps {
  bookCart: IBookCart;
  decrement: (bookId: string) => void;
  increment: (bookId: string) => void;
  deleteCart: (bookId: string) => void;
}
