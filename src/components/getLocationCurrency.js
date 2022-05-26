/** @format */

import curreny from "iso-country-currency";

export const getLocationCurrency = (userData) => {
  var locationCurrency;
  if (userData) {
    if (userData?.userLocation?.country) {
      locationCurrency = curreny.getAllInfoByISO(
        userData?.userLocation?.country
      );
    } else {
      locationCurrency = curreny.getAllInfoByISO(
        userData?.userIp?.country_code
      );
    }
    return locationCurrency.currency;
  } else {
    return "INR";
  }
};
