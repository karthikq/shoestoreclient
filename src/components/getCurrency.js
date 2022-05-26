/** @format */

export const getCurrency = (price) => {
  const result = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price);
  return price;
};
