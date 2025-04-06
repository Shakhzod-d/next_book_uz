import { useContext } from "react";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { LayoutContext } from "@/layout/context";

export const useBasket = () => {
  const [
    getOrderInfoClient,
    getOrderInfoData,
    getOrderInfoStatus,
    getOrderInfoError,
  ] = useRequest();

  const {
    state: { shoppingCardList },
    actions: { setShoppingCardList },
  } = useContext(LayoutContext);

  const getOrderInfo = async (data: any) => {
    await getOrderInfoClient.post("order/info", data);
  };

  const countPayment = async (type: string) => {
    let requestData = {
      deliveryType: type ? type : DELIVERY_TYPE_OPTIONS[2]._id,
      books: shoppingCardList?.map((item: any) => ({
        bookId: item._id,
        type: "paper",
        quantity: item.amount,
      })),
    };
    await getOrderInfo(requestData);
  };

  return {
    state: {
      getOrderInfoState: {
        getOrderInfoData,
        getOrderInfoStatus,
        getOrderInfoError,
      },
    },
    actions: { getOrderInfo, countPayment },
  };
};
