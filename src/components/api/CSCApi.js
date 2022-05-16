/** @format */

const { default: axios } = require("axios");

export const CSCApi = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",

  headers: {
    "X-CSCAPI-KEY": "Q214VEpHeDNmbDV4aHRCeTVyWmxSVXJQVUNGM1cwZEN2ellDUHZYQw==",
  },
  redirect: "follow",
});
