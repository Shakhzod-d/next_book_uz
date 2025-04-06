"use client";
import { URLSearchParamsInit } from "react-router-dom";

import { useSearchParams } from "next/navigation";

export function useCustomSearchParams(): [ISearchParams, ISetSearchParams] {
  const searchParams = useSearchParams();

  let obj: ISearchParams = {};

  for (const [key, value] of searchParams.entries()) {
    if (obj[key]) {
      if (Array.isArray(obj[key])) obj[key] = [...obj[key], value];
      else obj[key] = [obj[key], value];
    } else obj[key] = value;
  }

  const setSearch: ISetSearchParams = (nextInit) => {
    const newParams = new URLSearchParams(nextInit as Record<string, string>);
    window.history.replaceState(null, "", `?${newParams.toString()}`);
  };

  return [obj, setSearch];
}

export type ISetSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOptions?:
    | {
        replace?: boolean | undefined;
        state?: any;
      }
    | undefined
) => void;

export interface ISearchParams {
  [key: string]: string | string[];
}
