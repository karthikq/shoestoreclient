/** @format */

const axios = require("axios");
// https://api.ipdata.co?api-key=${"0b953632748eeb22974bdb44dda243b5fa8cc01c4d2dd55f7c2223d0"}
export const getUserip = async () => {
  try {
    const data = await axios.get("https://geolocation-db.com/json/");
    if (data.data) {
      return data.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};
