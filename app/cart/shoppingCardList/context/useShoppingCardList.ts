import { useRequest } from "@/hooks/useRequest/useRequest";

export const useShoppingCardList = () => {
  const [
    getDeliveryPriceClient,
    getDeliveryPriceResponse,
    getDeliveryPriceState,
    getDeliveryPriceError,
  ] = useRequest();

  const getDeliveryPrice = async () => {
    await getDeliveryPriceClient.get("settings/delivery");
  };

  return {
    state: {
      getDeliveryPriceState: {
        getDeliveryPriceResponse,
        getDeliveryPriceState,
        getDeliveryPriceError,
      },
    },
    actions: { getDeliveryPrice },
  };
};
