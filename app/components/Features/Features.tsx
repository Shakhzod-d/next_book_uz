"use client";

import Image from "next/image";
import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FeatureCardStyled } from "./Feature.style";
import { IFeatureCard } from "./Features.types";
import DebitCardIcon from "../../../assets/images/DebitCardIcon.svg";
import BookIcon from "../../../assets/images/BookIcon.svg";
import ProtectedIcon from "../../../assets/images/ProtectedIcon.svg";
import CarIcon from "../../../assets/images/CarIcon.svg";

const FeatureCard: FC<IFeatureCard> = ({ imgUrl, msg, title }) => {
  return (
    <FeatureCardStyled>
      <Image
        src={imgUrl}
        alt={title}
        className="feature-img mb-3"
        width={50}
        height={50}
      />
      <div>
        <h3 className="feature-title mb-2">{title}</h3>
        <p className="feature-msg">{msg}</p>
      </div>
    </FeatureCardStyled>
  );
};

const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="container pb-5 mb-4">
      <Grid container columnSpacing={2.5} rowSpacing={{ xs: 2, sm: 2 }}>
        <Grid item xs={12} md={3} sm={6}>
          <FeatureCard
            imgUrl={CarIcon}
            // title="HOME.DELIVERY_TEXT"
            // msg="HOME.DELIVERY_TEXT_MSG"
            title={t("HOME.DELIVERY_TEXT")}
            msg={t("HOME.DELIVERY_TEXT_MSG")}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <FeatureCard
            imgUrl={BookIcon}
            // title="HOME.CHOICE_TEXT"
            // msg="HOME.CHOICE_TEXT_MSG"
            title={t("HOME.CHOICE_TEXT")}
            msg={t("HOME.CHOICE_TEXT_MSG")}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <FeatureCard
            imgUrl={DebitCardIcon}
            // title="HOME.PAYMENT"
            // msg="HOME.PAYMENT_MSG"
            title={t("HOME.PAYMENT")}
            msg={t("HOME.PAYMENT_MSG")}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <FeatureCard
            imgUrl={ProtectedIcon}
            // title="HOME.PROTECTED_SYSTEM"
            // msg="HOME.PROTECTED_SYSTEM_MSG"
            title={t("HOME.PROTECTED_SYSTEM")}
            msg={t("HOME.PROTECTED_SYSTEM_MSG")}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default Features;
