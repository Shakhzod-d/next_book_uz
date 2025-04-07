"use client";

import React, { FC } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import Label from "../Label/Label";
import Error from "../Error/Error";
// import { Label, Error } from "components";
import { IRadioButton, IRadioButtonProps } from "./RadioButton.types";

const RadioButton: FC<IRadioButtonProps> = ({
  control,
  name,
  handleRadioButtonChange,
  label = "",
  radioButtonList = [],
  className,
  error,
  rules = { required: false },
  defaultValue,
}) => {
  return (
    <div className={className}>
      {label && <Label label={label} />}
      <Controller
        rules={rules}
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...field } }) => (
          <RadioGroup
            row
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
              if (handleRadioButtonChange) {
                handleRadioButtonChange(e);
              }
            }}
            defaultValue={defaultValue}
            {...field}
          >
            {radioButtonList.map((radioButton: IRadioButton) => (
              <FormControlLabel
                key={radioButton.value}
                value={radioButton.value}
                control={<Radio />}
                label={radioButton.label}
              />
            ))}
          </RadioGroup>
        )}
      />

      {!!error && <Error message={error.message} />}
    </div>
  );
};

export default RadioButton;
