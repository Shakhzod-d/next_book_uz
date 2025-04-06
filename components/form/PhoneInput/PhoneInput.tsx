"use client";

import React from "react";
import { IMaskInput } from "react-imask";
import Label from "../Label/Label";
import Error from "../Error/Error";
import { MaskInputStyled } from "./PhoneInput.style";

interface Props {
  placeholder?: string;
  name?: string;
  className?: string;
  error?: any;
  label?: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const PhoneInput: React.FC<Props> = ({
  placeholder = "+998 -- --- -- --",
  name = "phoneNumber",
  className = "",
  error,
  label,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <MaskInputStyled className={className}>
      {label && <Label label={label} />}

      <IMaskInput
        mask="+{998} 00 000 00 00"
        unmask={false}
        placeholder={placeholder}
        name={name}
        className={`reactInputMask ${error ? "error" : ""}`}
        // value={value}
        value={value ? `+998 ${value.replace(/^\+998\s?/, "")}` : "+998 "}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <Error message={error.message} />}
    </MaskInputStyled>
  );
};

export default PhoneInput;
