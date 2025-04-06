import { ICategory } from "@/types/common";

export interface ICollectionTab {
  tabValue: string;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  categories: ICategory[];
}
