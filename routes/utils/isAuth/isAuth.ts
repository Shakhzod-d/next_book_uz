import browserStorage from "@/services/storage/browserStorage";

export const isToken = () => {
  let token = browserStorage.get<undefined | null | string>("token");
  return !!token;
};
