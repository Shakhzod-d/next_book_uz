import { format } from "date-fns";

export const dateCovert = (date: string | undefined, timeCheck = false) => {
  if (date) {
    if (timeCheck) {
      return format(new Date(date), "dd.MM.yyyy | HH:mm:ss");
    } else {
      return format(new Date(date), "dd.MM.yyyy");
    }
  } else {
    return "";
  }
};
