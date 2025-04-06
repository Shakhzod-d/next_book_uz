import { IFilter } from "../../container/MobileFilter.types";

export interface IMobilePriceFilter {
  filter: IFilter | null;
  priceChange: (newPriceFilter: IFilter) => void;
}
