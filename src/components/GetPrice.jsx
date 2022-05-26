/** @format */

import { useRaf } from "react-use";

import React, { useEffect, useState } from "react";
import { getLocationCurrency } from "./getLocationCurrency";

import { useSelector } from "react-redux";

const GetPrice = ({ userData }) => {
  const auth = useSelector((state) => state.User.auth);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    fetcUserIp();
    return () => {
      setCountryCode("");
    };
  }, []);
  const fetcUserIp = async () => {
    const res = await getLocationCurrency(userData, auth);
    res && setCountryCode(res);
  };

  return <React.Fragment>{countryCode && countryCode}</React.Fragment>;
};

export default GetPrice;
