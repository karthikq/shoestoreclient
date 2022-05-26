/** @format */

import toast from "react-hot-toast";

import { backendApi } from "../../api/api";
import { IS_NOT_AUTH, REGISTER_USER } from "../../reducers/constants";
import { getUserip } from "../../UserIp/Getuserip";

export const LoginUser =
  (userData, handleErrors, navigate) => async (dispatch) => {
    try {
      const resp = await backendApi.post("/auth/user/login", userData);
      handleErrors([]);
      localStorage.setItem("authToken", resp.data.token);

      await dispatch({
        type: REGISTER_USER,
        payload: resp.data.userData,
      });
      navigate("/");
    } catch (error) {
      const newErrorArray = [];

      const errors = error.response;
      if (errors.data?.errors?.length > 0) {
        handleErrors(errors.data.errors);
      }

      if (error.response.status === 402) {
        newErrorArray.push({
          value: "password",
          msg: "Invalid Credentials",
          param: "password",
        });
        handleErrors(newErrorArray);
      }
      if (error.response.status === 403) {
        newErrorArray.push({
          value: "password",
          msg: "Email is already registered in Google login",
          param: "password",
        });
        handleErrors(newErrorArray);
      }
      if (error.status === 500) {
        toast.error("Server error please try again");
      }
    }
  };
export const ResiterUser =
  (userData, handleErrors, navigate) => async (dispatch) => {
    userData.userIp = await getUserip();

    try {
      const { data } = await backendApi.post("/auth/user/signup", userData);

      localStorage.setItem("authToken", data.token);

      await dispatch({
        type: REGISTER_USER,
        payload: data.userData,
      });
      handleErrors([]);
      navigate("/");
    } catch (error) {
      console.log(error);
      const errors = error.response;
      if (errors) {
        handleErrors(errors.data.errors);
      } else {
        toast.error("Something went wrong please refresh page and try again");
      }
    }
  };

export const LogoutUser = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem("authToken");

    const toastToken = toast.loading("Logging out");

    await backendApi.post("/auth/user/logout");

    await dispatch({
      type: IS_NOT_AUTH,
    });
    toast.success("User successfully logged out", {
      id: toastToken,
    });
    navigate("/");
  } catch (error) {
    console.log(error.response);
    toast.error("Please refresh and try again");
  }
};
