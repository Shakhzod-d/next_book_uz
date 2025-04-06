import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";

export interface IUsePublishing {
  state: {
    getPublishingState: {
      getPublishingResponse: any;
      getPublishingStatus: TApiResponseStatus;
      getPublishingError: any;
    };
  };
  actions: { getPublishing: () => void };
}
