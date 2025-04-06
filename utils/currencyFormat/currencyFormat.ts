const formatter = new Intl.NumberFormat("uz", {
  currency: "USZ",
  minimumFractionDigits: 0,
});

export default formatter.format;
