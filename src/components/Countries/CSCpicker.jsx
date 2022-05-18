/** @format */

import React, { useEffect, useState } from "react";

import { CSCApi } from "../api/CSCApi";

const CSCpicker = ({ state, details, setDetails, value }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);

  const fetchCountries = () => {
    let data;

    CSCApi.get("/countries")
      .then((list) => {
        data = list;
      })
      .then(() => {
        data && setCountries(data.data);
      });
  };

  const fetchStateofCountry = (value) => {
    let data;

    CSCApi.get("/countries/" + value + "/states")
      .then((list) => {
        data = list;
      })
      .then(() => {
        data && setStates(data.data);
      });
  };
  const fetchCityofstate = (value) => {
    let data;
    CSCApi.get(
      "/countries/" + details.country + "/states/" + details.state + "/cities"
    )
      .then((list) => {
        data = list;
      })
      .then(() => {
        data && setCity(data.data);
      });
  };

  useEffect(() => {
    if (state === "country") {
      fetchCountries();
    }
    if (state === "state" && details?.country) {
      fetchStateofCountry(value);
    }
    if (state === "city" && details?.state) {
      fetchCityofstate(value);
    }
    return () => {
      if (details?.country) {
        setCountries(countries);
      } else {
        setCountries([]);
      }
    };
  }, [state, details]);

  const fetchValue = () => {
    if (state === "country") {
      return details?.country;
    }
    if (state === "state" && details?.country) {
      return details.state;
    }
    if (state === "city" && details?.state) {
      return details?.city;
    }
  };

  return (
    <React.Fragment>
      <select
        name={state}
        value={details && details[state]}
        className="usersetting-select"
        onChange={(e) => {
          state === "country" && setDetails({ country: e.target.value });
          state === "state" &&
            setDetails({ ...details, state: e.target.value });
          state === "city" && setDetails({ ...details, city: e.target.value });
        }}>
        <optgroup label={state + "s"}>
          {state === "country" &&
            countries?.map((item) => (
              <option key={item.iso2} value={item.iso2}>
                {item.name}
              </option>
            ))}{" "}
          {state === "state" &&
            states?.map((item) => (
              <option key={item.iso2} value={item.iso2}>
                {item.name}
              </option>
            ))}{" "}
          {state === "city" &&
            city?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
        </optgroup>
      </select>
    </React.Fragment>
  );
};

export default CSCpicker;
