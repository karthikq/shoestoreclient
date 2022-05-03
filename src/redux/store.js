/** @format */

import { configureStore, createStore } from "@reduxjs/toolkit";
import { productSlice } from "./product";
import thunk from "redux-thunk";
export default configureStore({
  reducer: {
    product: productSlice,
  },
  middleware: [thunk],
});
