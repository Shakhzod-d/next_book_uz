import {
  IAuthor,
  IBookCart,
  IDiscount,
  IGenre,
  TBookState,
} from "@/types/common";

export interface IBookCard {
  _id: string;
  author: IAuthor;
  authors?: IAuthor[];
  bookPrice: number;
  imgUrl: string | null;
  name: string;
  state: TBookState;
  link?: string;
  cover?: string;
  discounts: IDiscount[];
  amount: number;
  genres: IGenre[];
  handleCartClick?: (bookCart: IBookCart) => void;
  rating?: number;
  rateCount?: number;
}
