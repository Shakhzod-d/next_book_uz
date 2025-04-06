"use client";

import { Dialog, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Button } from "components";
// import { useCustomSearchParams } from "hooks";
import get from "lodash.get";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
// import browserStorage from "services/storage/browserStorage";
import CheckIcon from "../../assets/CheckIcon";
import { PaidDialogContent } from "./PaidDialog.style";
import { SHOPPING_CART_KEY } from "../../../../../contants/storage";
import { useCustomSearchParams } from "@/hooks";
import browserStorage from "@/services/storage/browserStorage";
import { Button } from "@/components";

const PaidDialog = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [serachParams] = useCustomSearchParams();
  const payLinks: any = browserStorage.get<
    | {
        orderId: string;
        paymeLink: string;
        clickLink: string;
      }
    | undefined
  >("payLinks");

  const [open, setOpen] = React.useState(!!serachParams.orderId);

  const getOrder = async () => {
    if (serachParams.orderId) {
      try {
        const response = await axios.get(`order/${serachParams.orderId}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    }
  };

  const { data } = useQuery({
    queryKey: ["getOrder/checkout/pageee", serachParams.orderId],
    queryFn: getOrder,
    enabled: !!serachParams.orderId,
    // onSuccess: (res) => {
    //   if (get(res, "data.isPaid")) {
    //     localStorage.removeItem("payLinks");
    //     localStorage.removeItem(SHOPPING_CART_KEY);
    //   }
    // },MUST CHECK
  });

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={() => {
        setOpen(false);
        navigate(pathname);
      }}
    >
      <PaidDialogContent className="p-4">
        {get(data, "data.isPaid") ? (
          <div className="success-content">
            <div className="d-flex align-items-center mb-2">
              <div className="me-3">
                <CheckIcon />
              </div>
              <h2 className="success-title">
                {t("SUCCESSFULLY.THANK_YOUR_PURCHASE")}
              </h2>
            </div>
            <p className="success-msg mb-4">
              {t("SUCCESSFULLY.THENKS_YOUR_PURCHASE_MSG")}
            </p>
            <Grid container columnSpacing={3}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  className="me-4"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setOpen(false);
                    navigate(pathname);
                  }}
                  value={t("COMMON.CANCEL")}
                ></Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => navigate("/profile")}
                  fullWidth
                  variant="contained"
                  color="warning"
                  value={t("SUCCESSFULLY.GO_TO_PROFILE")}
                ></Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className="error-content">
            <h2 className="text-center mb-3">
              {t("SUCCESSFULLY.PAYMENT_FAILED_TEXT")}
            </h2>
            <Grid container columnSpacing={3}>
              <Grid item>
                {!!payLinks && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      window.location.href = JSON.parse(payLinks)?.paymeLink;
                      setOpen(false);
                    }}
                    value="Payme ilovasi orqali"
                  ></Button>
                )}
              </Grid>
              <Grid item>
                {!!payLinks && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      window.location.href = JSON.parse(payLinks)?.clickLink;
                      setOpen(false);
                    }}
                    value=" Click ilovasi orqali"
                  ></Button>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </PaidDialogContent>
    </Dialog>
  );
};

export default PaidDialog;
