import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export interface ISkletonList {
  length: number;
  variant?: "text" | "rectangular" | "circular" | undefined;
  height?: string | number | undefined;
  width?: string | number | undefined;
  sx?: SxProps<Theme> | undefined;
  animation?: false | "pulse" | "wave" | undefined;
  className?: string;
}
