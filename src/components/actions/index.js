/** @format */
import axios from "axios";
import { backendApi } from "../api/api";

import toast from "react-hot-toast";
import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  GET_PRODUCT,
  LIKE_PRODUCT,
  REMOVE_PRODUCT,
  SINGLE_PRODUCT,
  UPDATE_USER,
  UPDATE_VIEW,
} from "../reducers/constants";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await backendApi.get("/product/all");

    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const singleProduct = (p_id) => async (dispatch, getState) => {
  try {
    const { data } = await backendApi.get("/product/get/" + p_id);

    dispatch({
      type: SINGLE_PRODUCT,
      payload: data.productData,
    });
  } catch (error) {
    console.log(error);
    toast.error("product not found");
  }
};
export const fetchselProduct = () => async (dispatch, getState) => {
  const products = sessionStorage.getItem("data").split(",");

  await dispatch(fetchProducts());

  if (getState().Products.length > 0) {
    const data = getState().Products.filter((item) => {
      return products.find((i) => {
        return item.keywords.includes(i) ? item : "";
      });
    });
    console.log(data);
    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  }
};

export const updateViewCount = (product) => async (dispatch) => {
  try {
    const { data } = await backendApi.patch("/product/update/view/" + product);

    dispatch({
      type: UPDATE_VIEW,
      payload: data.updatedProduct,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    // if (error) {
    //   toast.error("Product not found");
    // }
  }
};

export const updateLike = (product) => async (dispatch) => {
  try {
    const { data } = await backendApi.patch("/product/like/" + product);

    dispatch({
      type: UPDATE_VIEW,
      payload: data.updatedProduct,
    });
  } catch (error) {
    toast.dismiss();
    toast.error("You have already liked the post");
    // if (error) {
    //   toast.error("Product not found");
    // }
  }
};
export const addRating = (product, count) => async (dispatch) => {
  try {
    const toastToken = toast.loading("Adding rating to the product");

    const { data } = await backendApi.patch(
      "/product/rate/" + product + "?count=" + count
    );

    if (data.status === 400) {
      toast.dismiss();
      toast.error("You have already rated the product");
    } else {
      await dispatch({
        type: UPDATE_VIEW,
        payload: data.updatedProduct,
      });
      toast.success("You rated the product " + count + " star", {
        id: toastToken,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("There was an error while exexuting please refresh page");
  }
};

export const removeRating = (product) => async (dispatch) => {
  try {
    const toastToken = toast.loading("Removing the product rating");
    const { data } = await backendApi.patch(
      "/product/remove/rating/" + product
    );

    if (data.status === 404) {
      toast.error("Product not found");
    }
    await dispatch({
      type: UPDATE_VIEW,
      payload: data.updatedProduct,
    });
    toast.success("You removed the product rating", {
      id: toastToken,
    });
  } catch (error) {
    toast.error("Please refresh page");
  }
};

export const getcsrfToken = () => async (dispatch) => {
  const { data } = await backendApi.get("/getcsrftoken");

  return data;
};

export const createProduct =
  (productDetails, urlarray, navigate) => async (dispatch) => {
    productDetails.p_img = urlarray;

    try {
      const toastToken = toast.loading("Creating product");

      const { data } = await backendApi.post(
        "/product/create",
        {
          productDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await dispatch({
        type: CREATE_PRODUCT,
        payload: data,
      });
      toast.success("Product created", {
        id: toastToken,
      });
      navigate("/");
    } catch (error) {
      toast.dismiss();

      const errors = error.response;
      if (errors.status === 500) {
        toast.error("Server error please refresh page and try again");
      } else {
        toast.error("Please login and continue");
      }
    }
  };

export const removeProduct =
  (prodId, navigate) => async (disptach, getState) => {
    try {
      console.log(prodId);
      const toastToken = toast.loading("Deleting product please wait");

      const { data } = await backendApi.patch("/product/remove/" + prodId);
      const user = getState().User.userDetails._id;
      if (data.status === 201) {
        disptach({
          type: REMOVE_PRODUCT,
          payload: data.product,
        });
        disptach({
          type: UPDATE_USER,
          payload: data.userData,
        });
      }
      toast.success("Product deleted", {
        id: toastToken,
      });
      navigate("/get/user/" + user);
    } catch (error) {
      console.log(error.response);
      toast.dismiss();
      const status = error.response.status;
      if (status === 404) {
        toast.error("Product not found");
        navigate("/");
      }
      if (status === 500) {
        toast.error("Please refresh and try again");
        navigate("/");
      }
      if (status === 403) {
        toast.error("User not authenticated to delete this product");
      }
    }
  };
