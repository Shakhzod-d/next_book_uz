export type TAddEditRequestMetod = "put" | "post";

export interface IBaseResponsePagin<T> {
  code: number;
  data?: {
    total: number;
    data: T;
  };
  message: string;
  statusCode?: number;
  success?: boolean;
  time?: string;
}
