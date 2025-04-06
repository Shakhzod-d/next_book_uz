import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OrderInfoStyled } from "./OrderInfo.style";
import { PageTitle } from "../../../orders/container/Orders.style";
import { IOrderInfo } from "./OrderInfo.types";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";
import formatter from "@/services/formatter";

const OrderInfo: React.FC<IOrderInfo> = ({
  address,
  deliveryPrice,
  deliveryType,
  paymentType,
  totalPrice,
  isLoading,
  comment,
  isPaid,
}) => {
  const { t } = useTranslation();

  const deliveryTypeLabel = React.useMemo(() => {
    const findOrderDelivery = DELIVERY_TYPE_OPTIONS.find(
      (delivery) => delivery._id === deliveryType
    );
    return findOrderDelivery ? t(findOrderDelivery.label) : null;
  }, [deliveryType]);

  const paymentTypeLabel = React.useMemo(() => {
    if (paymentType === "card") return t("PROFILE.CARD");
    else return t("PROFILE.CASH");
  }, [paymentType]);

  const skeleton = React.useMemo(() => {
    return (
      <Grid container spacing={3}>
        {new Array(6).fill("").map((_, index) => (
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <Skeleton
                className="order-info-card-label  mb-3"
                width="calc(80%)"
              />
              <Skeleton className="order-info-card-text" width="calc(50%)" />
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }, []);

  return (
    <OrderInfoStyled className="mb-4">
      {isLoading ? (
        <Skeleton
          width="300px"
          className="page-title page-title-skeleton mb-3"
        />
      ) : (
        <PageTitle className="mb-3">{t("PROFILE.ORDER_INFO")}</PageTitle>
      )}

      {isLoading ? (
        skeleton
      ) : (
        <Grid container spacing={{ md: 3, sm: 3, xs: 2 }}>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.TYPE_RECEPTION")}
              </p>
              <p className="order-info-card-text">{deliveryTypeLabel}</p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.DELIVERY_ADDRESS")}
              </p>
              <p className="order-info-card-text ">{address}</p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.PAYMENT_TYPE")}
              </p>
              <p className="order-info-card-text">{paymentTypeLabel}</p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.ORDER_PRICE")}
              </p>
              <p className="order-info-card-text">
                {formatter(totalPrice)} so‘m
              </p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.DELIVERY_PRICE")}
              </p>
              <p className="order-info-card-text">
                {formatter(deliveryPrice)} so‘m
              </p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="order-info-card">
              <p className="order-info-card-label  mb-3">
                {t("PROFILE.PAYMENT_STATUS")}
              </p>
              <p className="order-info-card-text">
                {isPaid ? t("PROFILE.PAID") : t("PROFILE.NOT_PAID")}
              </p>
            </div>
          </Grid>
        </Grid>
      )}
    </OrderInfoStyled>
  );
};

export default OrderInfo;
