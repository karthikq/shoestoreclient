/** @format */

import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { CSCApi } from "../api/CSCApi";

const CSCpicker = ({ state, details, setDetails, value }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);

  const fetchCountries = async () => {
    try {
      const { data } = await CSCApi.get("/countries");
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStateofCountry = async (value) => {
    try {
      const { data } = await CSCApi.get("/countries/" + value + "/states");

      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCityofstate = async (value) => {
    try {
      const { data } = await CSCApi.get(
        "/countries/" + details.country + "/states/" + details.state + "/cities"
      );

      setCity(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems(state);
  }, [state, details]);

  const getItems = async (state) => {
    if (state === "country") {
      await fetchCountries();
    }
    if (state === "state") {
      await fetchStateofCountry(value);
    }
    if (state === "city") {
      await fetchCityofstate(value);
    }
  };

  return (
    <>
      <select
        name={state}
        className="usersetting-select"
        onChange={(e) => {
          state === "country" &&
            setDetails({ ...details, country: e.target.value });
          state === "state" &&
            setDetails({ ...details, state: e.target.value });
          state === "city" && setDetails({ ...details, city: e.target.name });
        }}>
        <optgroup label={state + "s"}>
          {state === "country" &&
            countries?.map((item) => (
              <option value={item.iso2}>{item.name}</option>
            ))}{" "}
          {state === "state" &&
            states?.map((item) => (
              <option value={item.iso2}>{item.name}</option>
            ))}{" "}
          {state === "city" &&
            city?.map((item) => <option value={item.iso2}>{item.name}</option>)}
        </optgroup>
      </select>
    </>
  );
};

export default CSCpicker;
