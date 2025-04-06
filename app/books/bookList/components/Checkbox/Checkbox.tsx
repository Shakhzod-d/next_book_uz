import React from "react";
import CheckIcon from "@/assets/icons/CheckIcon";
import { CustomCheckboxStyled } from "./Checkbox.style";
import { ICheckbox } from "./Checkbox.types";
import { useTheme } from "@mui/material";
import get from "lodash.get";

const Checkbox: React.FC<ICheckbox> = ({ className, ...props }) => {
  const theme = useTheme();
  return (
    <CustomCheckboxStyled mode={get(theme, "palette.mode")}>
      <input type="checkbox" className={`my-input ${className}`} {...props} />
      <span className="check-mark">
        <CheckIcon width="16px" height="16px" />
      </span>
    </CustomCheckboxStyled>
  );
};

export default Checkbox;
