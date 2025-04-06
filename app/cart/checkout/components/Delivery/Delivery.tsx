"use client";

import React from "react";
import { CheckoutCard } from "../PaymentForm/PaymentForm.style";
import { IDelivery } from "./Delivery.types";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { DeliveryCheckboxCard } from "./Delivery.style";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";
import MailIcon from "@/assets/icons/MailIcon";
import PickUpIcon from "@/assets/icons/PickUpIcon";
import CarIcon from "@/assets/icons/CarIcon";

const Delivery: React.FC<IDelivery> = ({ deliveryType, setdeliveryType }) => {
  const { t } = useTranslation();

  const cardClick = (newDeliveryType: string) => {
    setdeliveryType(newDeliveryType);
  };

  return (
    <CheckoutCard className="mb-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="checkout-cart-title mb-3 font-500">
          {t("CHECKOUT.DELIVERY_TYPE") + "*"}
        </h3>
        <span className="checkout-cart-title mb-3 font-500 danger">
          {t("CHECKOUT.DELIVERY_INFO")}
        </span>
      </div>
      <Grid container spacing={3} className="mb-4">
        <Grid item xs={12} sm={4}>
          <DeliveryCheckboxCard
            onClick={() => cardClick(DELIVERY_TYPE_OPTIONS[1]._id)}
            className={`p-3 ${
              deliveryType === DELIVERY_TYPE_OPTIONS[1]._id ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center py-2">
              <MailIcon />
              <span className="ms-2 font-500">{t("CHECKOUT.MAIL")}</span>
            </div>
            {/* <p>{t("CHECKOUT.MAIL_MSG")}</p> */}
          </DeliveryCheckboxCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DeliveryCheckboxCard
            onClick={() => cardClick(DELIVERY_TYPE_OPTIONS[2]._id)}
            className={`p-3 ${
              deliveryType === DELIVERY_TYPE_OPTIONS[2]._id ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center py-2">
              <PickUpIcon />
              <span className="ms-2 font-500">{t("CHECKOUT.PICKUP")}</span>
            </div>
            {/* <p>{t("CHECKOUT.PICKUP_MSG")}</p> */}
          </DeliveryCheckboxCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DeliveryCheckboxCard
            onClick={() => cardClick(DELIVERY_TYPE_OPTIONS[0]._id)}
            className={`p-3 ${
              deliveryType === DELIVERY_TYPE_OPTIONS[0]._id ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center py-2">
              <CarIcon />
              <span className="ms-2 font-500">{t("CHECKOUT.COURIER")}</span>
            </div>
            {/* <p>{t("CHECKOUT.COURIER_MSG")}</p> */}
          </DeliveryCheckboxCard>
        </Grid>
      </Grid>
    </CheckoutCard>
  );
};

export default Delivery;
