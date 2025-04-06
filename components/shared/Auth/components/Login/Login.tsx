"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, PhoneInput } from "@/components";
import { phoneNumberPattern } from "@/contants/pattern";
import browserStorage from "@/services/storage/browserStorage";
import { ISignUpRequest } from "../SignUp/SignUp.types";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ILogin } from "./Login.types";
import { LoginStyled } from "./Login.style";

const Login: React.FC<ILogin> = ({ setState }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState, getValues, setValue } = useForm();

  const signInFunction = async (formData: any) => {
    if (!formData.phoneNumber) return;

    let signInRequest = {
      ...formData,
      phoneNumber: formData.phoneNumber?.replace(/\s+/g, ""),
    };
    browserStorage.set("phoneNumber", signInRequest.phoneNumber);
    mutation.mutate(signInRequest);
  };

  const login = async (formValues: ISignUpRequest) => {
    try {
      await axios.post("sign-in", formValues);
    } catch (err) {
      throw err;
    }
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setState("verify");
    },
  });

  if (!mounted) return null;

  return (
    <LoginStyled onSubmit={handleSubmit(signInFunction)}>
      <h2 className="font-600 mb-2 login-title">
        {t("REGISTER.PHONE_NUMBER")}
      </h2>
      <p className="phone-number-msg mb-3">{t("REGISTER.PHONE_NUMBER_MSG")}</p>

      <PhoneInput
        placeholder="+998 -- --- -- --"
        value={getValues("phoneNumber")}
        onChange={(e) => setValue("phoneNumber", e.target.value)}
        onBlur={register("phoneNumber").onBlur}
        error={formState.errors.phoneNumber}
        className="mb-4 auth-input"
      />

      <Button
        fullWidth
        disabled={mutation.isPending}
        className="mb-3"
        value={t("REGISTER.SIGN_IN")}
        color="warning"
        variant="contained"
        type="submit"
      />
      <div className="login-botton-text">
        {t("REGISTER.DONT_HAVE_AN_ACCOUNT")}{" "}
        <span className="link-style" onClick={() => setState("sign-up")}>
          {t("REGISTER.REGISTER")}
        </span>
      </div>
    </LoginStyled>
  );
};

export default Login;
