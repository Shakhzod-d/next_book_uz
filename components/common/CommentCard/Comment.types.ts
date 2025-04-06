export interface IComment {
  bookId?: string;
  createdAt?: string;
  message: string;
  _id?: string;
  rating: number;
  parentId?: string;
  user: {
    firstName: string;
    lastName: string;
    imgUrl?: string;
  };
  reply?: IComment[];
}

export interface ICommentCardProps {
  comment: IComment;
  bookId: string;
}
