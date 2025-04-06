import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";
import { ReactNode } from "react";
import { JsxElement } from "typescript";

export interface IButton {
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: any;
  value: string | JsxElement | ReactNode;
  className?: string;
  element?: ReactNode | null;
  variant?: "text" | "outlined" | "contained" | undefined;
  status?: TApiResponseStatus;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  id?: string;
  form?: string;
  children?: string | ReactNode | JsxElement;
}
