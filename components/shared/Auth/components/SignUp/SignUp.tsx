"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import browserStorage from "@/services/storage/browserStorage";
import { ISignUp, ISignUpRequest } from "./SignUp.types";
import { Input } from "@/components";
import { PhoneInput } from "@/components";
import { phoneNumberPattern } from "@/contants/pattern";
// import { Button } from "components";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SignUpStyled } from "./SignUp.style";

const SighUp: React.FC<ISignUp> = ({ setState }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();

  const signUpFunction = (formData: any) => {
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      return;
    }

    let signUpRequest: ISignUpRequest = {
      ...formData,
      phoneNumber: formData.phoneNumber?.replace(/\s+/g, ""),
    };
    browserStorage.set("phoneNumber", signUpRequest.phoneNumber);
    mutation.mutate(signUpRequest);
  };

  const signUp = async (formValues: ISignUpRequest) => {
    try {
      await axios.post("sign-up", formValues);
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setState("verify");
    },
  });

  return (
    <SignUpStyled onSubmit={handleSubmit(signUpFunction)}>
      <h2 className="font-600 mb-2 sign-up-title">{t("REGISTER.REGISTER")}</h2>
      <Input
        className="mb-3  auth-input"
        label={t("REGISTER.FIRSTNAME")}
        error={formState.errors.firstName}
        params={{
          ...register("firstName", {
            required: { value: true, message: t("VALIDATION_MESSAGE") },
          }),
        }}
      />
      <Input
        className="mb-3  auth-input"
        label={t("REGISTER.LASTNAME")}
        error={formState.errors.lastName}
        params={{
          ...register("lastName", {
            required: { value: true, message: t("VALIDATION_MESSAGE") },
          }),
        }}
      />
      {/* <PhoneInput
        placeholder="+998 -- --- -- --"
        params={{
          ...register("phoneNumber", {
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
        error={formState.errors.phoneNumber}
        label={t("REGISTER.PHONE_NUMBER")}
        className="mb-3  auth-input"
      /> */}

      <Button
        fullWidth
        disabled={mutation.isPending}
        className="mb-3"
        value={t("REGISTER.REGISTER")}
        color="warning"
        variant="contained"
        type="submit"
      />
      <div className="sign-up-bottom-text">
        {t("REGISTER.I_AM_ALREADY_REGISTERED")}{" "}
        <span onClick={() => setState("login")} className="link-style">
          {t("REGISTER.SIGN_IN")}
        </span>
      </div>
    </SignUpStyled>
  );
};

export default SighUp;
