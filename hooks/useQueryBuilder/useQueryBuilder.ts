import React from "react";

export const useQueryBuilder = (name: string) => {
  const [query, setQuery] = React.useState("");

  const convertQuery = (array: string[]) => {
    array = [...new Set(array)];
    let newQuery = "";
    for (let str of array) {
      newQuery += `${name}=${str}&`;
    }
    setQuery(newQuery);
  };

  const resultArr: [el: string, el: (arg: string[]) => void] = [
    query,
    convertQuery,
  ];

  return resultArr;
};
