"use client";

import { Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import get from "lodash.get";
import { useTranslation } from "react-i18next";
import { Button, Input, PhoneInput, TextArea } from "@/components";
import { LayoutContext } from "@/layout/context";
import { ProfileContext } from "../../context";
import { Wrapper } from "./Settings.styles";
import { PageTitle } from "../orders/container/Orders.style";

const Settings = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const {
    state: {
      updateProfileState: {
        updateProfileResponse,
        updateProfileStatus,
        updateProfileError,
      },
    },
    actions: { updateProfile },
  } = React.useContext(ProfileContext);

  const {
    state: { user },
  } = React.useContext(LayoutContext);

  const submit = async (data: any) => {
    updateProfile({
      ...data,
      biography: data.biography || undefined,
      email: data.email || undefined,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      phoneNumber: data.phoneNumber || undefined,
    });
  };

  return (
    <Wrapper className="px-4">
      <PageTitle className="mb-3">{t("PROFILE.PROFILE_SETTINGS")}</PageTitle>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container columnSpacing={2}>
          <Grid item md={6} sm={12} xs={12}>
            <Input
              className="mb-4"
              label={t("REGISTER.FIRSTNAME")}
              params={{
                ...register("firstName"),
                defaultValue: get(user, "firstName"),
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Input
              className="mb-4"
              label={t("REGISTER.LASTNAME")}
              params={{
                ...register("lastName"),
                defaultValue: get(user, "lastName"),
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            {/* <PhoneInput
              className="mb-4"
              label={t("PROFILE.PHONE_NUMBER")}
              params={{
                ...register("phoneNumber"),
                type: "phoneNumber",
                defaultValue: get(user, "phoneNumber"),
              }}
            /> */}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Input
              className="mb-4"
              label={t("PROFILE.EMAIL")}
              params={{
                ...register("email"),
                type: "email",
                defaultValue: get(user, "email"),
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextArea
              label={t("PROFILE.BIO")}
              className="mb-3"
              params={{
                ...register("biography", {}),
                defaultValue: get(user, "biography"),
              }}
            />
          </Grid>
        </Grid>
        <div className="pt-2">
          <Button
            status={updateProfileStatus}
            variant="contained"
            color="warning"
            type="submit"
            value={t("COMMON.SAVE")}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default Settings;
