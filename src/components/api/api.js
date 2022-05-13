/** @format */

import axios from "axios";
import { backendUrl } from "./Backendurl";

console.log(backendUrl());

export const backendApi = axios.create({
  baseURL: backendUrl(),

  headers: {
    "Content-type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
