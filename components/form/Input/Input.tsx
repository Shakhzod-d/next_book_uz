import { FC } from "react";

import { IInputProps } from "./Input.types";
import { StyledInput } from "./Input.style";
import Label from "../Label/Label";
import Error from "../Error/Error";

const Input: FC<IInputProps> = ({
  label = "",
  params,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={className}>
      {label && <Label label={label} />}
      <StyledInput
        {...params}
        className={`${!!error ? "error" : ""}`}
        {...props}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      {!!error && <Error message={error.message} />}
    </div>
  );
};

export default Input;
