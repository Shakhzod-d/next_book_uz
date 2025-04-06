import React from "react";
import { Button, Input } from "@/components";
import { useTranslation } from "react-i18next";
import { CheckoutCard } from "../PaymentForm/PaymentForm.style";

const Promokod = ({ register, setPromokod, watch }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <CheckoutCard className="mb-3">
        <h3 className="checkout-cart-title mb-3 font-500">
          {t("CHECKOUT.PROMOKOD")}
        </h3>
        <div className="d-flex">
          <Input
            params={{
              ...register("promocode"),
            }}
          />
          <Button
            type="button"
            variant="contained"
            color="warning"
            className="ms-3"
            value={t("CHECKOUT.USE_PROMOKOD")}
            onClick={() => setPromokod(watch("promocode") ?? "")}
          />
        </div>
      </CheckoutCard>
    </>
  );
};

export default Promokod;
