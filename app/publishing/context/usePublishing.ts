import { useRequest } from "@/hooks/useRequest/useRequest";
import { IUsePublishing } from "./PublishingContext.types";

export const usePublishing = (): IUsePublishing => {
  const [
    getPublishingClient,
    getPublishingResponse,
    getPublishingStatus,
    getPublishingError,
  ] = useRequest();

  const getPublishing = async (limit: number = 24) => {
    await getPublishingClient.get(`publisher?page=1&limit=${limit}`);
  };

  return {
    state: {
      getPublishingState: {
        getPublishingResponse,
        getPublishingStatus,
        getPublishingError,
      },
    },
    actions: { getPublishing },
  };
};
