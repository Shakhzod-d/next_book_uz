"use client";

import React, { FC } from "react";
import { MenuItem, TextField } from "@mui/material";
import { AutoComplateStyled } from "./Select.style";
import { ISelectProps } from "./Select.types";
import Label from "../Label/Label";
import { Controller } from "react-hook-form";
// import { debounce } from "@/hooks/debounce/debounce";
import Error from "../Error/Error";

const Select: FC<ISelectProps> = ({
  label = "",
  options = [],
  error,
  name = "",
  className = "",
  handleInputChange,
  control,
  rules = { required: false },
  defaultValue,
  dataKey = "name",
  defaultInputValue = "",
  multiple = false,
  onChangeSelect,
  placeholder = "",
  disabled,
  key = "id",
  ...props
}) => {
  // const onInputChange = debounce(handleInputChange, 400);
  const onInputChange = (e: any) => {};

  return (
    <div className={className}>
      {label && <Label label={label} />}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, ...field } }) => {
          return (
            <AutoComplateStyled
              multiple={multiple}
              id="select"
              options={options}
              defaultValue={defaultValue}
              disabled={disabled}
              className={!!error ? "error" : ""}
              getOptionLabel={(option: any) => option[dataKey] || ""}
              loadingText="Loading..."
              noOptionsText="Data not found"
              onChange={(event: any, dataItem: any) => {
                onChange(dataItem);
                if (onChangeSelect) {
                  onChangeSelect(dataItem);
                }
              }}
              renderOption={(props: any, option: any) => (
                <MenuItem {...props} key={option[key]}>
                  {option[dataKey]}
                </MenuItem>
              )}
              renderInput={(prop: any) => (
                <TextField
                  {...prop}
                  label=""
                  placeholder={placeholder}
                  onChange={(e) => onInputChange(e.target.value)}
                />
              )}
              {...props}
              value={field.value}
            />
          );
        }}
      />
      {!!error && <Error message={error?.message} />}
    </div>
  );
};

export default Select;
