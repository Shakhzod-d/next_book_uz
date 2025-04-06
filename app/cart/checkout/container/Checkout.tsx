"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Grid } from "@mui/material";
// import { scrollToDefault } from "utils/scrollToDefault/scrollToDefault";
import { PaidDialog, PaymentCheck, PaymentForm } from "../components";
import { useTranslation } from "react-i18next";
// import { DELIVERY_TYPE_OPTIONS } from "contants/common";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { IBookCart } from "types/common";
// import axios from "services/api/client";
// import { useParams } from "react-router-dom";
import get from "lodash.get";
import { CheckoutContainer } from "./Checkout.style";
// import toast from "react-hot-toast";
import { IRegion } from "../context/CheckoutContext.types";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";
import { IBookCart } from "@/types/common";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { axiosInstance } from "@/services/api/client";
import { useParams } from "next/navigation";

const Checkout = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [deliveryType, setdeliveryType] = React.useState<string>(
    DELIVERY_TYPE_OPTIONS[1]._id
  );
  const storageCarts = localStorage.getItem("carts");
  const [carts, setCarts] = React.useState<IBookCart[]>(
    storageCarts ? (JSON.parse(storageCarts) as IBookCart[]) : []
  );
  const [promokod, setPromokod] = useState<string>("");
  const [region, setRegion] = useState<undefined | IRegion>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    scrollToDefault();
  }, []);

  const getOrderInfo = async (data: any) => {
    try {
      return await axiosInstance.post("order/info", data);
    } catch (err) {
      throw err;
    }
  };

  const requestData = React.useMemo(() => {
    return {
      deliveryType: deliveryType,
      books: carts.map((item: IBookCart) => ({
        bookId: item._id,
        type: "paper",
        quantity: item.amount,
      })),
      regionId: region?._id,
      promocode: promokod,
    };
  }, [carts, deliveryType, promokod, region]);

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderInfo1", requestData, region],
    queryFn: () => getOrderInfo(requestData),
    enabled: !!carts.length,
    // onError: (error: any) => {
    //   toast.error(error?.response?.data?.message);
    // },
    staleTime: 0,
  });

  const getBookById = async () => {
    try {
      if (id) {
        const res = await axiosInstance.get(`book/${id}`);
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation({
    mutationKey: ["getBookById/checkoutdd", id],
    mutationFn: getBookById,
    onSuccess: (res) => {
      setCarts([
        {
          _id: get(res, "data.data._id"),
          amount: 1,
          author: get(res, "data.data.author"),
          bookPrice: get(res, "data.data.bookPrice"),
          cover: get(res, "data.data.cover"),
          discounts: get(res, "data.data.discounts", []),
          imgUrl: get(res, "data.data.imgUrl"),
          maxAmount: get(res, "data.data.amount"),
          name: get(res, "data.data.name"),
          state: get(res, "data.data.state"),
          link: get(res, "data.data.link"),
          genres: get(res, "data.data.genres", []),
        },
      ]);
    },
  });

  React.useEffect(() => {
    if (id) {
      mutation.mutate();
    }
  }, [id]);

  return (
    <CheckoutContainer className="container my-5">
      <PaidDialog />
      <h1 className="font-500 mb-3 main-page-title">
        {t("CHECKOUT.SHOPPING")}
      </h1>
      <Grid container columnSpacing={3} className="pe-2">
        <Grid item xs={12} md={9} className="mb-3">
          <PaymentForm
            {...{
              deliveryType,
              setdeliveryType,
              orderInfoData: data,
              carts,
              setPromokod,
              promokod,
              region,
              setRegion,
              setIsSubmitting,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <PaymentCheck
            {...{
              deliveryType,
              orderInfoData: data,
              isLoading,
              carts,
              isSubmitting,
            }}
          />
        </Grid>
      </Grid>
    </CheckoutContainer>
  );
};

export default Checkout;
