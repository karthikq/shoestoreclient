/** @format */

import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { CSCApi } from "../api/CSCApi";

const CSCpicker = ({ state, details, setDetails, value }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

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
      console.log(data);
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems(state);
  }, [state]);

  const getItems = async (state) => {
    console.log(state);
    if (state === "country") {
      await fetchCountries();
    }
    if (state === "state") {
      await fetchStateofCountry(value);
    }
    if (state === "city") {
      await fetchCountries();
    }
  };

  return (
    <div className="usersetting-input_items">
      {
        <select
          name="country"
          className="usersetting-select"
          onChange={(e) =>
            setDetails({
              country: e.target.value,
            })
          }>
          <optgroup label="Countries">
            {state === "country" &&
              countries?.map((item) => (
                <option value={item.iso2}>{item.name}</option>
              ))}
          </optgroup>
        </select>
      }
    </div>
  );
};

export default CSCpicker;
