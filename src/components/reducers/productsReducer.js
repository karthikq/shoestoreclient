/** @format */

import { productsArray } from "../Products";
import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCTS,
  GET_PRODUCT,
  LIKE_PRODUCT,
  REMOVE_PRODUCT,
  SINGLE_PRODUCT,
  UPDATE_VIEW,
} from "./constants";

const intialState = [{}];

export const productsReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.products;

    case "SEL_PRODUCTS":
      return;

    case GET_PRODUCT:
      return action.payload;

    case EDIT_PRODUCT:
      return state.map((item) =>
        item.p_id === action.payload.p_id ? action.payload : item
      );

    case UPDATE_VIEW:
      return state.map((item) =>
        item.p_id === action.payload.p_id ? action.payload : item
      );

    case REMOVE_PRODUCT:
      return state.filter((item) => item._id !== action.payload._id);

    case CREATE_PRODUCT:
      return [...state, action.payload];

    case SINGLE_PRODUCT:
      return [action.payload];
    default:
      return state;
  }
};
