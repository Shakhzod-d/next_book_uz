import { CircularProgress } from "@mui/material";

import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import React from "react";
import { SaveButtonStyled } from "./Button.style";
import { IButton } from "./Button.types";

const Button: React.FC<IButton> = ({
  onClick,
  type = "button",
  value = "",
  disabled = false,
  className = "",
  element = null,
  variant = undefined,
  color = undefined,
  status = "INITIAL",
  fullWidth = false,
  id,
  form,
}) => {
  return (
    <SaveButtonStyled
      {...{
        className,
        variant,
        disabled,
        onClick,
        type,
        color,
        fullWidth,
        id,
        form,
      }}
    >
      {status === REQUEST_STATUS.loading && (
        <div className="buttonLoader">
          <div className="backgroundOpacity" />
          <CircularProgress />
        </div>
      )}

      {element && <span>{element}</span>}
      {String(value)}
    </SaveButtonStyled>
  );
};

export default Button;
