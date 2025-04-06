import React from "react";
import { MuiButtonStyled } from "./Button.style";
import { IButton } from "./Button.types";

const Button: React.FC<IButton> = ({ children, variant, color }) => {
  return <MuiButtonStyled {...{ variant, color }}>{children}</MuiButtonStyled>;
};

export default Button;
