/** @format */

import {
  FETCH_USER,
  FOUND_USER,
  IS_AUTH,
  IS_NOT_AUTH,
  REGISTER_USER,
  UPDATE_USER,
} from "./constants";

/** @format */
const initialState = {
  auth: false,
  userDetails: {},
  foundUserDetails: {},
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, auth: true };
    case IS_NOT_AUTH:
      return { ...state, auth: false, userDetails: {} };

    case FETCH_USER:
      return { ...state, auth: true, userDetails: action.payload };

    case UPDATE_USER:
      return { ...state, userDetails: action.payload };

    case FOUND_USER:
      return { ...state, foundUserDetails: action.payload };

    case REGISTER_USER:
      return { ...state, auth: true, userDetails: action.payload };
    default:
      return state;
  }
};
