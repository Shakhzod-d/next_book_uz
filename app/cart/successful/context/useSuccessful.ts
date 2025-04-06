import { useRequest } from "@/hooks/useRequest/useRequest";

export const useSuccessful = () => {
  const [
    getOrderByIdClient,
    getOrderByIdResponse,
    getOrderByIdStatus,
    getOrderByIdError,
  ] = useRequest();

  const getOrderById = async (id: string) => {
    await getOrderByIdClient.get(`order/${id}`);
  };
  return {
    state: {
      getOrderState: {
        getOrderByIdResponse,
        getOrderByIdStatus,
        getOrderByIdError,
      },
    },
    actions: { getOrderById },
  };
};
