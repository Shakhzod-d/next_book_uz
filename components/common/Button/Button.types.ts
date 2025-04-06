import { ReactNode } from "react";

export type TButtonVariant = "text" | "outlined" | "contained" | undefined;

export type TButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

export interface IButton {
  children: ReactNode;
  variant?: TButtonVariant;
  color?: TButtonColor;
}
