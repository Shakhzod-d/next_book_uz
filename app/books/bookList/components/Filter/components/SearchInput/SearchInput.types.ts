import { ChangeEvent } from "react";

export interface ISearchInput {
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
