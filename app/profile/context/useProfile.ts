"use client";

import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import get from "lodash.get";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { LayoutContext } from "@/layout/context";
import browserStorage from "@/services/storage/browserStorage";
import { IUpdateProfile, IUseProfile } from "./ProfileContext.types";
import { ERROR_MESSAGES } from "@/contants/errors";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export const useProfile = (): IUseProfile => {
  const token = browserStorage.get<string | undefined | null>("token");
  const router = useRouter();
  const { t } = useTranslation();
  const {
    state: {},
    actions: {
      setUser,
      setBookmarkListByStorage,
      setBookmarkListByApi,
      setBookmarkListTotal,
      setIsAuth,
    },
  } = useContext(LayoutContext);
  const [
    getProfileClient,
    getProfileResponse,
    getProfileStatus,
    getProfileError,
  ] = useRequest();

  const [
    updateProfileClient,
    updateProfileResponse,
    updateProfileStatus,
    updateProfileError,
  ] = useRequest();

  const [
    updateUserImageClient,
    updateUserImageResponse,
    updateUserImageStatus,
    updateUserImageError,
  ] = useRequest();

  const [
    userImageUploadClient,
    userImageUploadResponse,
    userImageUploadStatus,
    userImageUploadError,
  ] = useRequest();

  const [getOrdersClient, getOrdersResponse, getOrdersStatus, getOrdersError] =
    useRequest();

  const [logoutClient, logoutResponse, logoutStatus, logoutEror] = useRequest();

  const getProfile = async () => {
    if (token) {
      await getProfileClient.get(`profile`);
    }
  };
  const updateProfile = async (data: IUpdateProfile) => {
    await updateProfileClient.put(`profile`, data);
  };

  const userUploadImage = async (formData: any) => {
    await userImageUploadClient.post("upload", formData);
  };

  const logout = async () => {
    logoutClient.deleteRequest("logout");
  };

  const getOrders = async () => {
    await getOrdersClient.get("order?page=1&limit=100");
  };

  const updateUserImage = async (data: string) => {
    await updateUserImageClient.put("profile/photo", data);
  };

  const logoutSuccess = async () => {
    setBookmarkListByStorage([]);
    setBookmarkListByApi([]);
    setBookmarkListTotal(0);
    setUser(undefined);
    localStorage.clear();
    setIsAuth(false);
    router.push("/");
  };

  useEffect(() => {
    if (logoutStatus === REQUEST_STATUS.success) {
      logoutSuccess();
    }
  }, [logoutStatus]);

  useEffect(() => {
    if (updateProfileStatus === REQUEST_STATUS.success) {
      setUser(get(updateProfileResponse, "data"));
      browserStorage.set("user", get(updateProfileResponse, "data"));
      toast.success(
        t(ERROR_MESSAGES[get(updateProfileResponse, "statusCode")])
      );
    }
  }, [updateProfileStatus]);

  return {
    state: {
      getProfileState: {
        getProfileResponse,
        getProfileStatus,
        getProfileError,
      },
      updateProfileState: {
        updateProfileResponse,
        updateProfileStatus,
        updateProfileError,
      },
      userUploadImageState: {
        userImageUploadResponse,
        userImageUploadStatus,
        userImageUploadError,
      },
      updateUserImageState: {
        updateUserImageResponse,
        updateUserImageStatus,
        updateUserImageError,
      },
      getOrdersState: { getOrdersResponse, getOrdersStatus, getOrdersError },
    },
    actions: {
      getProfile,
      updateProfile,
      userUploadImage,
      logout,
      getOrders,
      updateUserImage,
    },
  };
};
