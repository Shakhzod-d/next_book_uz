export default function makeQueryString(params: any) {
  let queryString: string = "";

  Object.keys(params).forEach((key: any) => {
    if (
      params[key] !== null &&
      params[key] !== "" &&
      params[key] !== undefined
    ) {
      let value = params[key];
      if (typeof value === "string") {
        value = encodeURI(value);
        queryString = `${queryString + key}=${value}&`;
      }
      if (Array.isArray(value)) {
        value.forEach((item: any) => {
          queryString = queryString + `${key}=${item}&`;
        });
      }
    }
  });
  queryString = queryString.slice(0, -1);
  queryString = queryString ? `?${queryString}` : queryString;
  return queryString;
}
