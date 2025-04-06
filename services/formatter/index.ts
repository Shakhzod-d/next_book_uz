const formatterFormat = new Intl.NumberFormat("uz", {
  currency: "USZ",
  minimumFractionDigits: 0,
});

const formatter = (value: number, fixedNumber: number = 2) => {
  return formatterFormat.format(
    +(value ?? 0).toFixed(fixedNumber).replace(/,/g, " "),
  );
};

export default formatter;
