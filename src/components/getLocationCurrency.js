/** @format */

import curreny from "iso-country-currency";
import { getUserip } from "./UserIp/Getuserip";

export const getLocationCurrency = async (userData, auth) => {
  var locationCurrency;
  if (auth) {
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
    try {
      const res = await getUserip();
      locationCurrency = curreny.getAllInfoByISO(res.country_code).currency;
      return locationCurrency;
    } catch (error) {
      console.log(error);
    }
  }
};
