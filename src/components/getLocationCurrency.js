/** @format */

import curreny from "iso-country-currency";
import { getUserip } from "./UserIp/Getuserip";

export const getLocationCurrency = async (userData, auth) => {
  if (auth) {
    var locationCurrency;
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
      return res.country_code;
    } catch (error) {
      console.log(error);
    }
  }
};
