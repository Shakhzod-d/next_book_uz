"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { PaymentContainer, PayCheckStyled, BuyButton } from "./PayCheck.style";
import { IPayCheckProps } from "./PayCheck.types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/api/client";
import { IBookCart } from "@/types/common";
import get from "lodash.get";
import formatter from "@/services/formatter";
import { Skeleton } from "@mui/material";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";
import { useRouter } from "next/navigation";

const PayCheck: FC<IPayCheckProps> = ({ carts }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const buyNowClick = () => {
    // navigate(carts.length ? "/cart/checkout" : "/"); MUST CHECK
    router.push(carts.length ? "/cart/checkout" : "/");
  };

  const getOrderInfo = async (data: any) => {
    try {
      return await axiosInstance.post("order/info", data);
    } catch (err) {
      throw err;
    }
  };

  const requestData = React.useMemo(() => {
    return {
      deliveryType: DELIVERY_TYPE_OPTIONS[2]._id,
      books: carts?.map((item: IBookCart) => ({
        bookId: item._id,
        type: "paper",
        quantity: item.amount,
      })),
    };
  }, [carts]);

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderInfo", carts],
    queryFn: () => getOrderInfo(requestData),
  });

  return (
    <PaymentContainer>
      {isLoading ? (
        <PayCheckStyled className="p-3 mb-3">
          <Skeleton
            className="payment-title mb-3"
            variant="text"
            height="1.5rem"
          />

          <ul className="order-list list-unstyled m-0 p-0">
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <Skeleton className="grey-text" variant="text" width="35%" />
              <Skeleton className="black-text " variant="text" width="45%" />
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <Skeleton className="grey-text" variant="text" width="40%" />
              <Skeleton className="black-text " variant="text" width="45%" />
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <Skeleton className="grey-text" variant="text" width="33%" />
              <Skeleton className="black-text " variant="text" width="45%" />
            </li>
          </ul>
          <hr className="mb-3" />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Skeleton className="grey-text " variant="text" width="20%" />
            <Skeleton className="black-text " variant="text" width="45%" />
          </div>
        </PayCheckStyled>
      ) : (
        <PayCheckStyled className="p-3 mb-3">
          <div className="payment-title mb-3 font-600">
            {t("BASKET.YOUR_ORDERS")}
          </div>
          <ul className="order-list list-unstyled m-0 p-0">
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">
                {t("BASKET.BOOKS")}({get(data, "data.data.totalQuantity", 0)}){" "}
              </div>
              <div className="black-text font-500">
                {formatter(get(data, "data.data.totalPrice", 0))} so‘m
              </div>
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">{t("BASKET.DELIVERY")} </div>
              <div className="black-text font-500">
                {get(data, "data.data.totalQuantity", 0) != "0"
                  ? "20,000"
                  : "0"}{" "}
                so‘m
              </div>
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">{t("BASKET.DISCOUNT")} </div>
              <div className="black-text font-500">
                {formatter(get(data, "data.data.totalDiscount", 0))} so‘m
              </div>
            </li>
          </ul>
          <hr className="mb-3" />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="grey-text font-700">{t("BASKET.TOTAL_PRICE")} </div>
            <div className="black-text font-700">
              {formatter(
                get(data, "data.data.total", 0) > 0
                  ? get(data, "data.data.total", 0) + 20000
                  : 0
              )}{" "}
              so‘m
            </div>
          </div>
        </PayCheckStyled>
      )}

      <BuyButton
        onClick={buyNowClick}
        type="button"
        fullWidth
        variant="contained"
        color="warning"
        value={t("BASKET.BUY_NOW")}
      />
    </PaymentContainer>
  );
};

export default React.memo(PayCheck);
