import React from "react";

export interface ICheckbox {
  color?: string;
  name?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
  sx?: any;
}
