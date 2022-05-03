/** @format */

import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { productsReducer } from "./productsReducer";

export const Reducers = combineReducers({
  Products: productsReducer,
  User: AuthReducer,
});
