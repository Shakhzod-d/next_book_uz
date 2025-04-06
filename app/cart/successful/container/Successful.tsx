"use client";

import React, { Fragment, useContext, useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import { Button } from "@/components";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import browserStorage from "@/services/storage/browserStorage";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { CheckAnimation } from "../component";
import { SuccessfulContext } from "../context";
import { PayLinkStyled, SuccessfulStyled } from "../style/Successful";
import { IPayLinks } from "../types/Successful";
import { useParams } from "next/navigation";

const Successful = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  let payLinks: any = browserStorage.get<IPayLinks | undefined>("payLinks");

  const {
    state: {
      getOrderState: {
        getOrderByIdResponse,
        getOrderByIdStatus,
        getOrderByIdError,
      },
    },
    actions: { getOrderById },
  } = useContext(SuccessfulContext);

  useEffect(() => {
    scrollToDefault();
    getOrderById(id);
  }, []);

  const renderCheckAnimation = useMemo(() => {
    if (getOrderByIdStatus === REQUEST_STATUS.success) {
      if (get(getOrderByIdResponse, "data.isPaid")) {
        localStorage.removeItem("payLinks");
        return (
          <Fragment>
            <CheckAnimation />
            <h1 className="text-center my-5">
              {t("SUCCESSFULLY.SUCCESSFULLY_TEXT")}
            </h1>
            <h2 className="text-center mb-5 font-600">
              {t("SUCCESSFULLY.OPERATOR_CONNECTED")}
            </h2>
          </Fragment>
        );
      } else {
        return (
          <div className="mt-5">
            <h1 className="text-center pt-4">
              To'lov amalga oshmadi iltimos qaytadan urinib koring
            </h1>
            <Grid
              container
              alignItems="center"
              spacing={3}
              justifyContent="center"
              className="my-4 pb-4"
            >
              <Grid item>
                {!!payLinks && (
                  <PayLinkStyled
                    onClick={() =>
                      (window.location.href = JSON.parse(payLinks)?.paymeLink)
                    }
                  >
                    Payme ilovasi orqali
                  </PayLinkStyled>
                )}
              </Grid>
              <Grid item>
                {!!payLinks && (
                  <PayLinkStyled
                    onClick={() =>
                      (window.location.href = JSON.parse(payLinks)?.clickLink)
                    }
                  >
                    Click ilovasi orqali
                  </PayLinkStyled>
                )}
              </Grid>
            </Grid>
          </div>
        );
      }
    } else if (getOrderByIdStatus === REQUEST_STATUS.failed) {
      return (
        <div className="mt-5">
          <h1 className="text-center pt-4">
            To'lov amalga oshmadi iltimos qaytadan urinib koring
          </h1>
          <Grid
            container
            alignItems="center"
            spacing={3}
            justifyContent="center"
            className="my-4 pb-4"
          >
            <Grid item>
              {!!payLinks && (
                <PayLinkStyled
                  onClick={() =>
                    (window.location.href = JSON.parse(payLinks)?.paymeLink)
                  }
                >
                  Payme ilovasi orqali
                </PayLinkStyled>
              )}
            </Grid>
            <Grid item>
              {!!payLinks && (
                <PayLinkStyled
                  onClick={() =>
                    (window.location.href = JSON.parse(payLinks)?.clickLink)
                  }
                >
                  Click ilovasi orqali
                </PayLinkStyled>
              )}
            </Grid>
          </Grid>
        </div>
      );
    }
  }, [getOrderByIdStatus]);

  return (
    <SuccessfulStyled>
      {renderCheckAnimation}
      <Grid container justifyContent="center">
        <Link to="/">
          <Button
            value={t("SUCCESSFULLY.RETURN_HOME_PAGE")}
            variant="contained"
            color="primary"
          />
        </Link>
      </Grid>
    </SuccessfulStyled>
  );
};

export default Successful;
