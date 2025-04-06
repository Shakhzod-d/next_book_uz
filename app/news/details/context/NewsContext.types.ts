import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";
import { ReactNode } from "react";

export interface IUseNews {
  state: {
    getNewByIdStates: {
      getNewByIdData: any;
      getNewByIdStatus: TApiResponseStatus;
      getNewByIdError: any;
    };
  };
  actions: { getNewById: (id: string) => void };
}

export interface INewsProvider {
  children: ReactNode;
}
