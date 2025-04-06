import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";

export interface IUseHome {
  state: {
    getCategoryState: {
      getCategoryResponse: any;
      getCategoryStatus: TApiResponseStatus;
      getCategoryError: any;
    };

    getNewsState: {
      getNewsResponse: any;
      getNewsStatus: TApiResponseStatus;
      getNewsError: any;
    };
    getQuoteState: {
      getQuoteResponse: any;
      getQuoteStatus: TApiResponseStatus;
      getQuoteError: any;
    };
  };
  actions: {
    getCategory: () => void;
    getNews: () => void;
    getQuote: () => void;
  };
}
