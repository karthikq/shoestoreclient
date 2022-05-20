/** @format */

import { backendApi } from "../../api/api";
import { FETCH_SIMILAR_PROD } from "../../reducers/constants";

export const FetchSimilarprod = (keywords) => async (dispatch) => {
  try {
    const { data } = await backendApi.get("/similar/product/list/" + keywords);
    dispatch({
      type: FETCH_SIMILAR_PROD,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response);
  }
};
