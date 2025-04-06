"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import React from "react";
import { OrderInfo, PurchasedBooks, Stepper } from "../components";
import { useParams } from "next/navigation";

const Order = () => {
  const { id: orderId } = useParams();

  const getOrderById = async () => {
    try {
      return axios.get(`order/${orderId}`);
    } catch (err) {
      throw err;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderById", orderId],
    queryFn: getOrderById,
  });

  return (
    <>
      <Stepper status={get(data, "data.data.status")} isLoading={isLoading} />
      <OrderInfo
        isLoading={isLoading}
        deliveryType={get(data, "data.data.deliveryType")}
        address={get(data, "data.data.address.name", "")}
        paymentType={get(data, "data.data.paymentType")}
        totalPrice={get(data, "data.data.totalPrice")}
        deliveryPrice={get(data, "data.data.deliveryPrice")}
        comment={get(data, "data.data.comment", "")}
        isPaid={get(data, "data.data.isPaid")}
      />
      <PurchasedBooks
        isLoading={isLoading}
        books={get(data, "data.data.books", [])}
      />
    </>
  );
};

export default Order;
