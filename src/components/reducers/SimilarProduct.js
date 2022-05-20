/** @format */

import { FETCH_SIMILAR_PROD } from "./constants";

export const SimilarProduct = (state = [], action) => {
  switch (action.type) {
    case FETCH_SIMILAR_PROD:
      return action.payload;

    default:
      return state;
  }
};
