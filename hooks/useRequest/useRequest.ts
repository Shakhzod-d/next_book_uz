"use client";

import { ERROR_MESSAGES } from "@/contants/errors";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// import { RouteList } from "@/routes/constants/RouteList";
import axios from "../../services/api/client";
import { REQUEST_STATUS } from "./useRequest.constants";
import { DataType, TApiRequestMetod } from "./useRequest.types";
import { usePathname, useRouter } from "next/navigation";

export const useRequest = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<DataType | undefined>();
  const [status, setStatus] = useState<string>(REQUEST_STATUS.initial);
  const [error, setError] = useState<any>();

  const get = async (url: string) => await sendRequest("get", url);

  const post = async (url: string, data: any) =>
    await sendRequest("post", url, data);

  const put = async (url: string, data: any) =>
    await sendRequest("put", url, data);

  const deleteRequest = async (url: string) => await sendRequest("delete", url);

  // MUST CHECK LATER
  // const authCheck = () => {
  //   RouteList.forEach((route) => {
  //     if (route.isPrivate && pathname.includes(route.path)) {
  //       navigate("/");
  //     }
  //   });
  // };

  const sendRequest = async (
    method: TApiRequestMetod,
    url: string,
    data?: any
  ) => {
    setStatus(REQUEST_STATUS.loading);
    try {
      const res = await axios[method](url, data);
      setData(res.data);
      setStatus(REQUEST_STATUS.success);
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 404) {
        router.push("/not-found");
      }
      if (err?.response?.data?.code === 401) {
        // authCheck();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        setError(err);
        setStatus(REQUEST_STATUS.failed);
        toast.error(t(ERROR_MESSAGES[err?.response?.data?.statusCode]));
      }
    }
  };

  return [
    {
      get,
      post,
      put,
      deleteRequest,
    },
    data,
    status,
    error,
  ];
};
