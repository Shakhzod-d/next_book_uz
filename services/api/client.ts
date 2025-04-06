import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import browserStorage from "../storage/browserStorage";

const token = browserStorage.get("token");
const language = browserStorage.get<string | undefined>("i18nextLng");

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${token}`,
    language: language ? (language === "de" ? "latin" : language) : "uz",
  },
};

axios.interceptors.request.use(
  (config: any) => {
    const token = browserStorage.get("token");
    return {
      ...config,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      timeout: 31000,
      headers: {
        Authorization: `Bearer ${token}`,
        language: language ? (language === "de" ? "latin" : language) : "uz",
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosInstance: AxiosInstance = axios.create(config);

export default axios;
