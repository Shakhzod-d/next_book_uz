export const filterField = (event: any, array: string[]) => {
  let sortArray: string[] = [];
  let isChecked = array?.find((id: string) => id === event.target.id);
  if (!!isChecked) {
    sortArray = array.filter((id: string) => id !== event.target.id);
  } else {
    sortArray = array.concat(event.target.id);
  }
  return sortArray;
};
