/** @format */

import toast from "react-hot-toast";

import { backendApi } from "../../api/api";
import ToastErrors from "../../errors/ToastErrors";
import {
  FETCH_USER,
  FOUND_USER,
  IS_NOT_AUTH,
  UPDATE_USER,
} from "../../reducers/constants";

export const fetchUserDetails = () => async (dispatch, getState) => {
  try {
    const { data } = await backendApi.get("/user/userdetails");

    dispatch({
      type: FETCH_USER,
      payload: data.userData,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      dispatch({
        type: IS_NOT_AUTH,
      });
    }
  }
};

export const fetchIndUser = (userId) => async (dispatch) => {
  try {
    const { data } = await backendApi.get("/user/get/" + userId);
    dispatch({
      type: FOUND_USER,
      payload: data.foundUserData,
    });
  } catch (error) {
    toast.dismiss();
    if (error.response.status === 404) {
      toast.error("User not found!!!");
    }
  }
};

export const userAddtofav =
  (prodId, state, navigate) => async (dispatch, getState) => {
    try {
      let message;
      let user = getState().User.userDetails;

      if (state) {
        message = `Adding item to ${user.firstname}'s favourties`;
      } else {
        message = `Removing item from ${user.firstname}'s favourties`;
      }
      const toastToken = toast.loading(message);
      const { data } = await backendApi.patch("/user/add/fav/" + prodId);

      await dispatch({
        type: UPDATE_USER,
        payload: data.userData,
      });
      if (state) {
        message = `Item added to  ${user.firstname}'s favourites`;
      } else {
        message = `Item removed from  ${user.firstname}'s favourites`;
      }
      toast.success(message, {
        id: toastToken,
      });
    } catch (error) {
      toast.dismiss();

      const err = error.response;
      if (err.status === 401) {
        toast.error("Cannot add your own product to fav's");
      } else {
        ToastErrors(err.status, toast, navigate);
      }
    }
  };

export const addtocart = (prodId, navigate) => async (dispatch, getState) => {
  let message;
  let user = getState().User.userDetails;
  try {
    message = `Adding item to ${user.firstname}'s Cart`;

    const toastToken = toast.loading(message);
    const { data } = await backendApi.patch("/user/add/cart/" + prodId);
    console.log(data);
    await dispatch({
      type: UPDATE_USER,
      payload: data.userData,
    });

    message = `Item added to ${user.firstname}'s Cart`;

    toast.success(message, {
      id: toastToken,
    });
  } catch (error) {
    toast.dismiss();
    const err = error.response;
    if (err.status === 401) {
      toast.error("Cannot add your own product to cart");
    } else {
      ToastErrors(err.status, toast, navigate);
    }
  }
};

export const updateCartItems = (product, navigate) => async (dispatch) => {
  try {
    const { data } = await backendApi.patch("/user/remove/item/" + product);
    const toastToken = toast.loading("Updating cart");

    await dispatch({
      type: UPDATE_USER,
      payload: data.userData,
    });
    toast.success("Cart updated", {
      id: toastToken,
    });
  } catch (error) {
    toast.dismiss();

    ToastErrors(error.response.status, toast, navigate);
  }
};

export const deleteCartItem = (prodId, navigate) => async (dispatch) => {
  try {
    const { data } = await backendApi.patch("/user/delete/cart/item/" + prodId);
    const toastToken = toast.loading("Removing item from cart");

    await dispatch({
      type: UPDATE_USER,
      payload: data.userData,
    });
    toast.success("Item removed", {
      id: toastToken,
    });
  } catch (error) {
    toast.dismiss();
    ToastErrors(error.response.status, toast, navigate);
  }
};

export const UpdateUserDetails =
  (userDetails, callback) => async (dispatch, getState) => {
    let user = getState().User.userDetails;

    try {
      const toastToken = toast.loading(
        "Updating userdetails of" + user.firstname
      );

      const { data } = await backendApi.put(
        "/user/update/" + userDetails._id,
        userDetails
      );
      toast.success("User updated", {
        id: toastToken,
      });
      await dispatch({
        type: UPDATE_USER,
        payload: data.userData,
      });
    } catch (error) {
      console.log(error.response);
      toast.dismiss();
      if (error.response.status === 500) {
        toast.error("Please refresh page and try again");
      }
      if (error.response.status === 422) {
        toast.error("Please fill item with valid Data");
      }
    }
    callback();
  };
