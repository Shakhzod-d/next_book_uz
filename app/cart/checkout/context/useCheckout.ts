"use client";

import { useState } from "react";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { IAddOrderRequest } from "./CheckoutContext.types";
import { TDeliveryType } from "@/types/common";

export const useCheckout = () => {
  const [deliveryType, setDeliveryType] = useState<TDeliveryType>("pickup");
  const [addOrderClient, addOrderResponse, addOrderStatus, addOrderError] =
    useRequest();

  const [
    getByPointClient,
    getByPointResponse,
    getByPointStatus,
    getByPointError,
  ] = useRequest();

  const [
    searchLocationClient,
    searchLocationResponse,
    searchLocationStatus,
    searchLocationError,
  ] = useRequest();

  const [
    getDeliveryPriceClient,
    getDeliveryPriceResponse,
    getDeliveryPriceState,
    getDeliveryPriceError,
  ] = useRequest();

  const [
    getRegionsClient,
    getRegionsResponse,
    getRegionsState,
    getRegionsError,
  ] = useRequest();

  const [
    getDistrictsClient,
    getDistrictsResponse,
    getDistrictsState,
    getDistrictsError,
  ] = useRequest();

  const getDeliveryPrice = async () => {
    await getDeliveryPriceClient.get("settings/delivery");
  };

  const addOrder = async (addOrderRequest: IAddOrderRequest) => {
    await addOrderClient.post("order", addOrderRequest);
  };

  const getByPoint = async (url: string) => {
    await getByPointClient.get(url);
  };

  const searchLocation = async (search: string = "") => {
    if (!!search) {
      let url = `geocode?type=text&search=${search}&limit=10`;
      await searchLocationClient.get(url);
    }
  };

  const getRegions = async () => {
    await getRegionsClient.get("region?page=1&limit=20");
  };

  const getDistricts = async (id: string) => {
    await getDistrictsClient.get(`district?page=1&limit=100&regionId=${id}`);
  };

  return {
    state: {
      addOrderState: { addOrderResponse, addOrderStatus, addOrderError },
      getByPointState: {
        getByPointResponse,
        getByPointStatus,
        getByPointError,
      },
      searchLocationState: {
        searchLocationResponse,
        searchLocationStatus,
        searchLocationError,
      },
      getDeliveryPriceState: {
        getDeliveryPriceResponse,
        getDeliveryPriceState,
        getDeliveryPriceError,
      },
      getRegionsState: {
        getRegionsResponse,
        getRegionsState,
        getRegionsError,
      },
      getDistrictsState: {
        getDistrictsResponse,
        getDistrictsState,
        getDistrictsError,
      },
      deliveryType,
    },
    actions: {
      addOrder,
      getByPoint,
      searchLocation,
      getDeliveryPrice,
      setDeliveryType,
      getRegions,
      getDistricts,
    },
  };
};
