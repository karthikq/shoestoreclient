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
    const userIp = await getUserip();
    return userIp.country_code;
  }
};
