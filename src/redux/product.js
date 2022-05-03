/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [
    {
      p_id: "",
      p_name: "",
      p_img: [],
      p_desp: "",
      rating: "",
      viewCount: "",
      keywords: [],
    },
  ],
  reducers: {
    getProducts: (state, action) => {
      return (state = action.payload);
    },
    createProduct: (state, action) => {
      return [...state, action.payload];
    },
    deleteProduct: (state, action) => {},
    sigleProduct: (state, action) => {},
  },
});
export const { getProducts, createProduct, deleteProduct, sigleProduct } =
  productSlice.actions;

export default productSlice.reducer;
