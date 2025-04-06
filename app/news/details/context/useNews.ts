"use client";

import { useRequest } from "@/hooks/useRequest/useRequest";
import { IUseNews } from "./NewsContext.types";

export const useNews = (): IUseNews => {
  const [getNewByIdClient, getNewByIdData, getNewByIdStatus, getNewByIdError] =
    useRequest();
  const getNewById = (id: string) => {
    id && getNewByIdClient.get(`news/${id}`);
  };

  return {
    state: {
      getNewByIdStates: { getNewByIdData, getNewByIdStatus, getNewByIdError },
    },
    actions: { getNewById },
  };
};
