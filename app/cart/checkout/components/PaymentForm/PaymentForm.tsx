"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import get from "lodash.get";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Input, PhoneInput, Select, TextArea } from "@/components";

import { DEFAULT_LOCATION, FORM_NAMES } from "./PaymentForm.constants";
import { CheckoutCard, PaymentFormStyled } from "./PaymentForm.style";
import { CheckoutContext } from "../../context";
import { LayoutContext } from "@/layout/context";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { IPaymentForm } from "./PaymentForm.types";
import { phoneNumberPattern } from "@/contants/pattern";
import browserStorage from "@/services/storage/browserStorage";
import { IRegion } from "../../context/CheckoutContext.types";
import { IBookCart } from "@/types/common";
import Delivery from "../Delivery/Delivery";
import PaymentType from "../PaymentType/PaymentType";
import Promokod from "../Promokod/Promokod";
import { totalDiscount } from "@/utils/totalDiscount/totalDiscount";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { DELIVERY_TYPE_OPTIONS } from "@/contants/common";

const PaymentForm: React.FC<IPaymentForm> = ({
  deliveryType,
  setdeliveryType,
  orderInfoData,
  carts,
  setPromokod,
  promokod,
  region,
  setRegion,
  setIsSubmitting,
}) => {
  // const ymapsRef = useRef<any>(null);
  // const mapRef = useRef<any>(null);
  const { t } = useTranslation();
  const { id } = useParams();
  // const navigate = useNavigate();
  const [coords, setCoords] = useState<number[]>(DEFAULT_LOCATION);
  const [payType, setPayType] = useState<string>("card");
  const [cardType, setCardType] = useState<string>("payme");
  // const [region, setRegion] = useState<undefined | IRegion>();

  const {
    state: { user },
  } = useContext(LayoutContext);

  const { register, handleSubmit, formState, control, setValue, watch } =
    useForm({
      defaultValues: {
        [FORM_NAMES.firstName]: get(user, "firstName"),
        [FORM_NAMES.lastName]: get(user, "lastName"),
        [FORM_NAMES.district]: {},
        [FORM_NAMES.region]: {},
      },
    });

  const {
    state: {
      addOrderState: { addOrderResponse, addOrderStatus, addOrderError },
      // searchLocationState: { searchLocationResponse, searchLocationStatus },
      getRegionsState: { getRegionsResponse },
      getDistrictsState: { getDistrictsResponse },
    },

    actions: {
      addOrder,
      getDeliveryPrice,
      getRegions,
      getDistricts,
      searchLocation,
    },
  } = useContext(CheckoutContext);

  const successCallback = (position: any) => {
    setCoords([
      get(position, "coords.latitude"),
      get(position, "coords.longitude"),
    ]);
  };

  useEffect(() => {
    getDeliveryPrice();
    getRegions();
    navigator.geolocation.getCurrentPosition(successCallback);
  }, []);

  useEffect(() => {
    if (region) {
      getDistricts(region._id);
    }
  }, [region]);

  const addOrderFormSubmit = (formData: any) => {
    setIsSubmitting(true);
    let books = carts.map((shoppingCard: IBookCart) => {
      return {
        bookId: shoppingCard._id,
        type: "paper",
        price: shoppingCard.bookPrice,
        totalPrice: shoppingCard.bookPrice * shoppingCard.amount,
        quantity: shoppingCard.amount,
        totalDiscount: totalDiscount(
          shoppingCard.discounts,
          shoppingCard.bookPrice
        ),
        total:
          shoppingCard.bookPrice * shoppingCard.amount -
          totalDiscount(shoppingCard.discounts, shoppingCard.bookPrice),
      };
    });

    const totalDiscountSum: number = carts.reduce(
      (sum, cart) => (sum += totalDiscount(cart.discounts, cart.bookPrice)),
      0
    );
    const totalPrice: number = carts.reduce(
      (sum, cart) => (sum += cart.bookPrice * cart.amount),
      0
    );
    const total: number = carts.reduce(
      (sum, cart) =>
        (sum +=
          cart.bookPrice * cart.amount -
          totalDiscount(cart.discounts, cart.bookPrice)),
      0
    );

    let addOrderRequest = {
      deliveryPrice: get(orderInfoData, "data.data.deliveryPrice"),
      type: "paper",
      [FORM_NAMES.region]: formData[FORM_NAMES.region]?._id,
      [FORM_NAMES.district]: formData[FORM_NAMES.district]?._id,
      [FORM_NAMES.firstName]: formData[FORM_NAMES.firstName],
      [FORM_NAMES.lastName]: formData[FORM_NAMES.lastName],
      [FORM_NAMES.phoneNumber]: formData[FORM_NAMES.phoneNumber]?.replace(
        /\s+/g,
        ""
      ),
      [FORM_NAMES.deliveryType]: deliveryType || "pickup",
      [FORM_NAMES.paymentType]: payType,
      [FORM_NAMES.additional]: formData[FORM_NAMES.additional]
        ? formData[FORM_NAMES.additional]
        : null,
      books,
      cardType,
      totalDiscount: totalDiscountSum,
      totalPrice,
      total,
      address: { name: formData[FORM_NAMES.address] },
      redirectPoint: id ? `/${id}` : "",
      promocode: formData.promocode,
    };

    addOrder(addOrderRequest);
  };

  // const addressOnchange = (option: any) => {
  //   if (option) {
  //     setCoords([option.latitude, option.longitude]);
  //   }
  // };

  useEffect(() => {
    if (addOrderStatus === REQUEST_STATUS.success) {
      // reset({
      //   [FORM_NAMES.deliveryType]: DELIVERY_TYPE_OPTIONS?.map((e) => ({
      //     _id: e._id,
      //     label: t(e.label),
      //   }))?.[2]
      // })
      // setCardType("");
      toast.success("Buyurtmangiz qabul qilindi");
    }
  }, [addOrderStatus]);

  useEffect(() => {
    if (addOrderStatus === REQUEST_STATUS.failed) {
      toast.error(get(addOrderError, "response.data.message", ""));
    }
  }, [addOrderStatus]);

  useEffect(() => {
    if (
      addOrderStatus === REQUEST_STATUS.success &&
      payType === "card" &&
      !!cardType
    ) {
      browserStorage.set("payLinks", get(addOrderResponse, "data"));
      if (cardType === "payme") {
        window.location.href = get(addOrderResponse, "data.paymeLink");
      } else if (cardType === "click") {
        window.location.href = get(addOrderResponse, "data.clickLink");
      }
    }
  }, [addOrderStatus]);

  useEffect(() => {
    searchLocation("");
  }, []);

  const [getDistrictsClient] = useRequest();

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const findDistrict = async () => {
      await getDistrictsClient
        .get(`district?page=1&limit=100&regionId=62d12b7ae1b3659c153c2123`)
        .then((data: any) =>
          setDistricts(
            data.data.data.find(
              (item: any) =>
                item.name === "Chilonzor tumani" ||
                item.name === "Чиланзарский район"
            )
          )
        );
    };

    findDistrict();
    if (deliveryType === DELIVERY_TYPE_OPTIONS[2]._id) {
      setValue(FORM_NAMES.address, t("HOME.DELIVERY_LOCATION"));
      setValue(FORM_NAMES.district, districts, { shouldValidate: true });
    } else {
      setValue(FORM_NAMES.district, null);
      setValue(FORM_NAMES.address, null);
    }
    if (
      deliveryType === DELIVERY_TYPE_OPTIONS[0]._id ||
      deliveryType === DELIVERY_TYPE_OPTIONS[2]._id
    ) {
      const findRegion = get(getRegionsResponse, "data.data", []).find(
        (region: IRegion) => region.paymentTypes?.includes("cash")
      );

      if (findRegion) {
        setRegion(findRegion);
        setValue(FORM_NAMES.region, findRegion, { shouldValidate: true });
      }
    } else {
      setRegion(undefined);
      setValue(FORM_NAMES.region, null);
    }
  }, [deliveryType]);

  return (
    <PaymentFormStyled
      onSubmit={handleSubmit(addOrderFormSubmit)}
      id="checkout"
    >
      <CheckoutCard className="mb-3">
        <h3 className="checkout-cart-title mb-3 font-500">
          {t("CHECKOUT.INFORMATION") + "*"}
        </h3>
        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} sm={4}>
            <Input
              label={t("REGISTER.FIRSTNAME")}
              params={{
                ...register(FORM_NAMES.firstName, {
                  required: { value: true, message: t("VALIDATION_MESSAGE") },
                }),
              }}
              error={formState.errors[FORM_NAMES.firstName]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              label={t("REGISTER.LASTNAME")}
              params={{
                ...register(FORM_NAMES.lastName, {
                  required: { value: true, message: t("VALIDATION_MESSAGE") },
                }),
              }}
              error={formState.errors[FORM_NAMES.lastName]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <PhoneInput
              defaultValue={get(user, "phoneNumber", "")}
              placeholder={"+998 -- --- -- --"}
              params={{
                ...register(FORM_NAMES.phoneNumber, {
                  required: {
                    value: true,
                    message: t("VALIDATION_MESSAGE"),
                  },
                  minLength: {
                    value: 9,
                    message: t("PHONE_VALIDATION_MESSAGE"),
                  },
                  pattern: {
                    value: phoneNumberPattern,
                    message: t("PHONE_VALIDATION_MESSAGE"),
                  },
                }),
              }}
              error={formState.errors[FORM_NAMES.phoneNumber]}
              label={t("REGISTER.PHONE_NUMBER")}
              className="mb-4"
            /> */}
          </Grid>
        </Grid>
      </CheckoutCard>

      <Delivery {...{ deliveryType, setdeliveryType }} />

      <CheckoutCard className="mb-3">
        <h3 className="checkout-cart-title mb-3 font-500">
          {t("CHECKOUT.ADDRESS") + "*"}
        </h3>

        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} sm={4}>
            <Select
              control={control}
              name={FORM_NAMES.region}
              error={formState.errors[FORM_NAMES.region]}
              rules={{
                required: { value: true, message: t("VALIDATION_MESSAGE") },
              }}
              label={t("CHECKOUT.REGION")}
              options={
                deliveryType === "courier"
                  ? get(getRegionsResponse, "data.data", []).filter(
                      (region: any) =>
                        region.name === "Toshkent shahri" ||
                        region.name === "Ташкент"
                    )
                  : get(getRegionsResponse, "data.data", [])
              }
              onChangeSelect={(region: IRegion) => {
                setRegion(region);
                setValue(FORM_NAMES.district, null);

                // getDeliveryPrice();
                // getOrderInfo();
              }}
              disabled={deliveryType === "pickup"}
              readOnly={deliveryType === DELIVERY_TYPE_OPTIONS[2]._id}
              dataKey="name"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              control={control}
              name={FORM_NAMES.district}
              error={formState.errors[FORM_NAMES.district]}
              rules={{
                required: { value: true, message: t("VALIDATION_MESSAGE") },
              }}
              label={t("CHECKOUT.DISTRICT")}
              options={
                deliveryType === "pickup"
                  ? get(getDistrictsResponse, "data.data", []).filter(
                      (item: any) =>
                        item.name === "Chilonzor tumani" ||
                        item.name === "Чиланзарский район"
                    )
                  : get(getDistrictsResponse, "data.data", [])
              }
              disabled={!region || deliveryType === "pickup"}
              dataKey="name"
            />
          </Grid>
          {deliveryType !== "pickup" && (
            <Grid item xs={12} sm={4}>
              <Input
                label={t`CHECKOUT.ADDRESS`}
                params={{
                  ...register(FORM_NAMES.address, {
                    required: { value: true, message: t("VALIDATION_MESSAGE") },
                  }),
                }}
                error={formState.errors[FORM_NAMES.address]}
              />
            </Grid>
          )}
          {/* <Grid item xs={12} sm={4}>
            <Select
              label={t`CHECKOUT.ADDRESS`}
              control={control}
              name={FORM_NAMES.address}
              rules={{
                required: { value: true, message: t("VALIDATION_MESSAGE") },
              }}
              options={get(searchLocationResponse, "data.data")}
              onChangeSelect={addressOnchange}
              error={formState.errors[FORM_NAMES.address]}
              handleInputChange={(search: string) => searchLocation(search)}
              placeholder={t`CHECKOUT.SEARCH_ADDRESS`}
              key="name"
            />
          </Grid> */}
        </Grid>
        {/* )} */}
        {/* <Grid container className="mb-4">
          <Grid item xs={12}>
            <YandexMapStyled className="map">
              <YMaps query={{ lang: 'en_US' }} instanceRef={mapRef}>
                <div>
                  <Map
                    defaultState={{ center: coords, zoom: 9 }}
                    width={"100%"}
                    height={"400px"}
                    //@ts-ignore
                    instanceRef={mapRef}
                  >
                    <Placemark geometry={coords} />
                    <FullscreenControl options={{ float: "left" }} />
                    <ZoomControl options={{ float: "left" }} />
                  </Map>
                </div>
              </YMaps>
            </YandexMapStyled>
          </Grid>
        </Grid> */}
      </CheckoutCard>

      <PaymentType
        {...{ payType, setPayType, cardType, setCardType, region }}
      />

      <Promokod
        register={register}
        formState={formState}
        setPromokod={setPromokod}
        watch={watch}
      />

      <CheckoutCard className="mb-3">
        <h3 className="checkout-cart-title mb-3 font-500">
          {t("CHECKOUT.ADDITIONAL")}
        </h3>
        <TextArea
          params={{
            ...register(FORM_NAMES.additional, {}),
          }}
        />
      </CheckoutCard>
    </PaymentFormStyled>
  );
};

export default PaymentForm;
