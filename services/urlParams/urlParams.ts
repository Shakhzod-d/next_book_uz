import React from "react";
import makeQueryString from "../makeQuery/makeQuery";

const useSearchParams = () => {
  const setParams = (object: any) => {
    const params = makeQueryString(object);
    window.history.pushState(
      null,
      "Unical Erp",
      window.location.href.split("?")[0] + params,
    );
  };

  const getParams = () => {
    const checkType = (value: any) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    };
    let object = new URLSearchParams(document.location.search);
    const params: any = {};
    object.forEach((value, key) => {
      if (params[key]) {
        if (Array.isArray(params[key])) params[key] = [...params[key], value];
        else params[key] = [params[key], value];
      } else params[key] = value;
    });
    return params;
  };

  return [setParams, getParams];
};
