export type TNew = "news" | "newBook" | "newDiscount";

export type TOrderStatus =
  | "pending"
  | "accepted"
  | "onTheWay"
  | "canceled"
  | "delivered";

export type TBookState = "new" | "old";

export type TBookLabel = "bestseller" | "popular" | "simple";

export type TDeliveryType = "courier" | "mail" | "pickup";

export type TPaymentType = "cash" | "card" | "balance";

export interface IBanner {
  _id: string;
  title: string;
  link: string;
  imgUrl: string;
  position: number;
  type: number;
}

export interface ICategory {
  books: IBook[] | [];
  imgUrl?: string;
  name: string;
  _id: string;
}

export interface IGenre {
  children: IGenre[];
  childs: any;
  imgUrl: string;
  name: string;
  parentId: string | null;
  _id: string;
  childCount: number;
}

export interface IAuthor {
  audioBookCount: number;
  bookCount: number;
  dateOfbirth: string;
  dateOfdeath: string;
  ebookCount: number;
  fullName: string;
  imgUrl: string | null;
  _id: string;
}
export interface IPublisher {
  _id: string;
  name: string;
  imgUrl: string;
  ebookCount: number;
  audioBookCount: number;
  bookCount: number;
}

export interface IShoppingCard {
  _id: string;
  amount: number;
  bookPrice: number;
  name: string;
  imgUrl: string;
  maxAmount: number;
  cover: string | undefined;
  totalDiscount: number;
}

export interface IBookCart extends IBookmark {
  maxAmount: number;
}

export interface IBookmark {
  _id: string;
  amount: number;
  bookPrice: number;
  link?: string;
  name: string;
  imgUrl: string | null;
  discounts: IDiscount[];
  cover: string | undefined;
  author: IAuthor;
  state: TBookState;
  genres: IGenre[];
}

export interface IDiscount {
  applyType: "cash" | "percent";
  finishDate: string;
  startDate: string;
  value: number;
  _id: string;
}

export interface IBook {
  _id: string;
  name: string;
  translator?: string;
  link?: string;
  description: any[];
  bookPrice: number;
  soldBookCount?: number;
  grade: number;
  amount: number;
  numberOfPage?: number;
  imgUrl: string;
  paperFormat?: string;
  language?: string;
  cover?: string;
  barcode?: string;
  typeOfWrite?: string;
  type: "single" | "collection";
  discounts: IDiscount[];
  isBookmark: boolean;
  state: TBookState;
  label: TBookLabel;
  additionalImgs: string[];
  author: IAuthor;
  authors?: IAuthor[];
  genres: IGenre[];
  rating?: number;
  rateCount?: number;
  contentLanguage?: string;
}

export interface INews {
  book: IBook;
  content: any[];
  createdAt: string;
  discount: IDiscount;
  imgUrl: string;
  isRead: number;
  readCount: number;
  title: string;
  type: TNew;
  _id: string;
  link?: string;
}

export interface IUser {
  balance: number;
  createdAt: string;
  firstName: string;
  frozenBalance: number;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  lastEnteredAt: string;
  lastName: string;
  numberOfTries: number;
  phoneNumber: string;
  signInAttempts: number;
  updatedAt: string;
  uuid: string;
  imgUrl: string;
  _id: string;
}

export interface IOrder {
  deliveryPrice?: number;
  deliveryType?: string;
  isPaid?: boolean;
  number: number;
  paymentType?: string;
  status: TOrderStatus;
  total: number;
  totalDiscount: number;
  totalPrice: number;
  type?: string;
  user?: IUser;
  createdAt?: string;
  UpdatedAt?: string;
  _id: string;
}
