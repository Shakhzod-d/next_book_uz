"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import browserStorage from "@/services/storage/browserStorage";
import { Button, Input } from "@/components";
import { IVerify } from "./Verify.types";
import { VerifyStyled } from "./Verify.style";
import get from "lodash.get";
import { LayoutContext } from "@/layout/context";
import toast from "react-hot-toast";

const Verify: React.FC<IVerify> = ({ setState, onClose }) => {
  const { t } = useTranslation();
  const { handleSubmit, register, formState } = useForm();

  const {
    state: {},
    actions: { setIsAuth, setUser },
  } = React.useContext(LayoutContext);

  const userVerify = async (otp: number) => {
    try {
      const phoneNumber = browserStorage.get("phoneNumber");
      let userVerifyRequest = {
        otp,
        phoneNumber,
      };
      const response = await axios.post("verify", userVerifyRequest);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const verifyCodeFunction = (data: any) => {
    mutation.mutate(data.code);
  };

  const mutation = useMutation({
    mutationFn: userVerify,
    onSuccess: (data: any) => {
      browserStorage.set("token", get(data, "data.data.token"));
      browserStorage.set("user", get(data, "data.data.user"));
      setUser(get(data, "data.data.user"));
      localStorage.removeItem("phoneNumber");
      setIsAuth(true);
      setState("login");
      onClose();
    },
    onError: (err: any) => {
      toast.error(get(err, "response.data.message", ""));
    },
  });

  return (
    <VerifyStyled onSubmit={handleSubmit(verifyCodeFunction)}>
      <h2 className=" mb-3 verify-title">{t("REGISTER.VERIFY")}</h2>
      <p className="verify-msg mb-3">{t("REGISTER.VERIFY_MSG")}</p>
      <Input
        label={t("REGISTER.CODE")}
        error={formState.errors.code}
        params={{
          ...register("code", {
            required: { value: true, message: t("VALIDATION_MESSAGE") },
            maxLength: {
              value: 4,
              message: "only 4 characters!",
            },
          }),
          type: "number",
        }}
        autoFocus
        className="mb-4 auth-input"
      />
      <Button
        fullWidth
        disabled={mutation.isPending}
        variant="contained"
        color="warning"
        value={t("REGISTER.VERIFY")}
        type="submit"
      />
      <div className="pt-3 verify-bottom-text">
        {t("REGISTER.NO_ACCOUNT")}{" "}
        <span className="link-style" onClick={() => setState("sign-up")}>
          {t("REGISTER.REGISTER")}
        </span>
      </div>
    </VerifyStyled>
  );
};

export default Verify;
