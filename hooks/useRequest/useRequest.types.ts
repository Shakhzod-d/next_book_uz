export interface DataType {
  code: number;
  message: string;
  data: any;
}

export type TApiRequestMetod = "get" | "post" | "put" | "delete";

export type TApiResponseStatus = "INITIAL" | "SUCCESS" | "FAILED" | "LOADING";

export interface IREquestStatus {
  [statusName: string]: TApiResponseStatus;
}
