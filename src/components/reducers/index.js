/** @format */

import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { productsReducer } from "./productsReducer";
import { SimilarProduct } from "./SimilarProduct";

export const Reducers = combineReducers({
  Products: productsReducer,
  User: AuthReducer,
  SimilarItems: SimilarProduct,
});
