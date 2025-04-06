"use client";

import React from "react";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { PaymentCheckStyled, RulesStyled } from "./PaymentCheck.style";
import formatter from "@/services/formatter";
import { IPaymentCheck } from "./PaymentCheck.types";
import { Checkbox, Skeleton } from "@mui/material";
import { Button } from "@/components";
import { Link } from "react-router-dom";

const PaymentCheck: React.FC<IPaymentCheck> = ({
  deliveryType,
  isLoading,
  orderInfoData,
  carts,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const [isAgree, setIsAgree] = React.useState(false);

  return (
    <React.Fragment>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          className=" mb-3"
          sx={{ borderRadius: "8px", height: "260px" }}
        />
      ) : (
        <PaymentCheckStyled className="p-3 mb-3">
          <div className="payment-title mb-3 font-600">
            {t("BASKET.YOUR_ORDERS")}
          </div>
          <ul className="order-list list-unstyled m-0 p-0">
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">
                {t("BASKET.BOOKS")}(
                {get(orderInfoData, "data.data.totalQuantity", 0)}){" "}
              </div>
              <div className="black-text font-500">
                {formatter(get(orderInfoData, "data.data.totalPrice", 0))} so‘m
              </div>
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">{t("BASKET.DELIVERY")} </div>
              <div className="black-text font-500">
                {formatter(get(orderInfoData, "data.data.deliveryPrice", 0))}{" "}
                so‘m
              </div>
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">{t("BASKET.DISCOUNT")} </div>
              <div className="black-text font-500">
                {formatter(get(orderInfoData, "data.data.totalDiscount", 0))}{" "}
                so‘m
              </div>
            </li>
            <li className="order-list-item d-flex justify-content-between align-items-center mb-3">
              <div className="grey-text">{t("BASKET.PROMOKOD_DISCOUNT")} </div>
              <div className="black-text font-500">
                {formatter(
                  get(orderInfoData, "data.data.totalPromocodeDiscount", 0)
                )}{" "}
                so‘m
              </div>
            </li>
          </ul>
          <hr className="mb-3" />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="grey-text font-700">{t("BASKET.TOTAL_PRICE")} </div>
            <div className="black-text font-700">
              {formatter(get(orderInfoData, "data.data.total", 0))} so‘m
            </div>
          </div>

          {/* <div className="d-flex justify-content-between align-items-center mb-2" >
              <div className="grey-text ">{t("CHECKOUT.DELIVERY_DATE")} </div>
              <div className="black-text font-500">30-sentabr</div>
            </div> */}
        </PaymentCheckStyled>
      )}

      <RulesStyled className="d-flex align-items-center mb-2">
        <Checkbox
          color="warning"
          onChange={(event) => setIsAgree(event.target.checked)}
        />
        <div>
          <Link className="rules-link" to="/">
            {t("CHECKOUT.RULES")}
          </Link>
          <span>{t("CHECKOUT.AGREE")}</span>
        </div>
      </RulesStyled>

      <Button
        disabled={!isAgree || isSubmitting} // add more loading state so this will be disabled
        form="checkout"
        type="submit"
        fullWidth
        variant="contained"
        color="warning"
        className=""
        value={t("BASKET.BUY_NOW")}
      />
    </React.Fragment>
  );
};

export default PaymentCheck;
