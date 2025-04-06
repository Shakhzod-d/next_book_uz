"use client";

import React, { useEffect, useState } from "react";
import { BookAmountCard, BookAmountStyled } from "./BookAmount.style";
import BookWarningIcon from "../../../assets/images/BookWarningIcon.svg";
import { Grid } from "@mui/material";
import formatter from "@/services/formatter";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const BookAmount = () => {
  const { t } = useTranslation();
  const [formattedAmount, setFormattedAmount] = useState<null | string>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // This will run only on the client-side
    const formatted = formatter(5000);
    setFormattedAmount(formatted);
  }, []);

  if (!mounted) return null;

  return (
    <BookAmountStyled className="container pt-5 mb-5">
      <Grid
        container
        columnSpacing={{ sm: 3, xs: 0 }}
        rowSpacing={{ xs: 3 }}
        sx={{ width: "100%" }}
        justifyContent="space-between"
      >
        <Grid item md={4} sm={4} xs={12}>
          <BookAmountCard className="d-flex align-items-start">
            <div className="bg-book-warning d-flex justify-content-center align-items-center me-3 mb-2">
              {/* <img
                className="book-image-warning"
                src={BookWarningIcon}
                alt="Book image"
              /> */}
              {/* MUST CHECK LATER */}
              <Image
                className="book-image-warning"
                src={BookWarningIcon}
                alt="Book image"
                width={50}
                height={50}
              />
            </div>

            <div>
              <h2 className="book-amount mb-2 ">{formattedAmount}</h2>
              <p className="book-amount-msg">{t("HOME.BOOK_AMOUNT_MSG_1")}</p>
            </div>
          </BookAmountCard>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <BookAmountCard className="d-flex align-items-start">
            <div className="bg-book-warning d-flex justify-content-center align-items-center me-3  mb-2">
              <Image
                className="book-image-warning"
                src={BookWarningIcon}
                alt="Book image"
                width={50}
                height={50}
              />
            </div>

            <div>
              <h2 className="book-amount mb-2">{formatter(30000)}</h2>
              <p className="book-amount-msg">{t("HOME.BOOK_AMOUNT_MSG_2")}</p>
            </div>
          </BookAmountCard>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <BookAmountCard className="d-flex align-items-start">
            <div className="bg-book-warning d-flex justify-content-center align-items-center me-3  mb-2">
              <Image
                className="book-image-warning"
                src={BookWarningIcon}
                alt="Book image"
                width={50}
                height={50}
              />
            </div>

            <div>
              <h2 className="book-amount mb-2">{formatter(7)}</h2>
              <p className="book-amount-msg">{t("HOME.BOOK_AMOUNT_MSG_3")}</p>
            </div>
          </BookAmountCard>
        </Grid>
      </Grid>
    </BookAmountStyled>
  );
};

export default BookAmount;
