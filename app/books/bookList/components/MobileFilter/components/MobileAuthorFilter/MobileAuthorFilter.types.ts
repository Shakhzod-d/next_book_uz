import { IFilter } from "../../container/MobileFilter.types";

export interface IMobileAuthorFilter {
  allCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    array: any[],
  ) => void;
  checkboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    allCheckboxId: string,
  ) => void;
  filter: IFilter | null;
}
