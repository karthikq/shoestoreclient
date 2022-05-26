/** @format */

import { useRaf } from "react-use";

import React, { useEffect, useState } from "react";
import { getLocationCurrency } from "./getLocationCurrency";
import { getUserip } from "./UserIp/Getuserip";
import { useSelector } from "react-redux";

const GetPrice = ({ userData }) => {
  const auth = useSelector((state) => state.User.auth);
  const [coutrnCode, setCountryCode] = useState("");

  useEffect(() => {
if(!auth){

    fetcUserIp();
    return () => {
      setCountryCode({});
    };
}
  }, []);
  const fetcUserIp = () => {
    const userIp = getUserip().then((res) => {
      setCountryCode(res);
    });
  };

  return (
    <React.Fragment>
      {auth ? getLocationCurrency(userData) : coutrnCode?.country_code}
    </React.Fragment>
  );
};

export default GetPrice;
