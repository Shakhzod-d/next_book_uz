import { useRequest } from "@/hooks/useRequest/useRequest";
import { categoryListLimit } from "../constants/Home.constants";
import { IUseHome } from "./HomeContext.types";

export const useHome = (): IUseHome => {
  const [
    getCategoryClient,
    getCategoryResponse,
    getCategoryStatus,
    getCategoryError,
  ] = useRequest();

  const [getNewsClient, getNewsResponse, getNewsStatus, getNewsError] =
    useRequest();

  const [getQuoteClient, getQuoteResponse, getQuoteStatus, getQuoteError] =
    useRequest();

  const getCategory = async (categoryLimit: number = categoryListLimit) => {
    await getCategoryClient.get(`category?page=1&limit=${categoryLimit}`);
  };

  const getQuote = async () => {
    await getQuoteClient.get("quote/random");
  };

  const getNews = async () => {
    await getNewsClient.get("banner?page=1&limit=10&type=10");
  };

  return {
    state: {
      getCategoryState: {
        getCategoryResponse,
        getCategoryStatus,
        getCategoryError,
      },

      getQuoteState: { getQuoteResponse, getQuoteStatus, getQuoteError },
      getNewsState: { getNewsResponse, getNewsStatus, getNewsError },
    },
    actions: {
      getCategory,
      getNews,
      getQuote,
    },
  };
};
