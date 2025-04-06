import { IBookCard } from "@/components/common/BookCard/BookCard.types";
import { IBookmark, IGenre } from "@/types/common";

export interface IBookMarkCard extends IBookCard {
  deleteBookmark: (_id: string) => void;
  genres: IGenre[];
}

export interface ICardActions extends IBookmark {
  genres: IGenre[];
}
