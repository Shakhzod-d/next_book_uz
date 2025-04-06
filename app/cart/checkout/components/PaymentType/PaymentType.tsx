import { Grid } from "@mui/material";
import CreditCardIcon from "@/assets/icons/CreditCardIcon";
import WalletIcon from "@/assets/icons/WalletIcon";
import React from "react";
import { useTranslation } from "react-i18next";
import { CheckoutCard } from "../PaymentForm/PaymentForm.style";
import { PaymentTypeCard } from "./PaymentType.style";
import { IPayment } from "./PaymentType.types";

const PaymentType: React.FC<IPayment> = ({
  payType,
  setPayType,
  cardType,
  setCardType,
  region,
}) => {
  const { t } = useTranslation();

  const paymeClick = () => {
    setPayType("card");
    setCardType("payme");
  };

  const clickClick = () => {
    setPayType("card");
    setCardType("click");
  };
  return (
    <CheckoutCard className="mb-3">
      <h3 className="checkout-cart-title mb-3 font-500">
        {t("CHECKOUT.PAYMENT_TYPE") + "*"}
      </h3>
      <Grid container spacing={3} className="mb-4">
        <Grid item xs={12} sm={4}>
          <PaymentTypeCard
            onClick={paymeClick}
            className={`p-3 ${
              payType === "card" && cardType === "payme" ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center py-2">
              <CreditCardIcon />
              <span className="ms-2 font-500">{t("CHECKOUT.PAYME")}</span>
            </div>
            {/* <p>{t("CHECKOUT.PAYME_MSG")}</p> */}
          </PaymentTypeCard>
        </Grid>
        {region?.paymentTypes?.length === 3 && (
          <Grid item xs={12} sm={4}>
            <PaymentTypeCard
              onClick={() => setPayType("cash")}
              className={`p-3 ${payType === "cash" ? "active" : ""}`}
            >
              <div className="d-flex align-items-center py-2">
                <WalletIcon />
                <span className="ms-2 font-500">{t("CHECKOUT.CASH")}</span>
              </div>
              {/* <p>{t("CHECKOUT.CASH_MSG")}</p> */}
            </PaymentTypeCard>
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <PaymentTypeCard
            onClick={clickClick}
            className={`p-3 ${
              payType === "card" && cardType === "click" ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center py-2">
              <CreditCardIcon />
              <span className="ms-2 font-500">{t("CHECKOUT.CLICK")}</span>
            </div>
            {/* <p>{t("CHECKOUT.CLICK_MSG")}</p> */}
          </PaymentTypeCard>
        </Grid>
      </Grid>
    </CheckoutCard>
  );
};

export default PaymentType;
