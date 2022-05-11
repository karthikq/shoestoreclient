/** @format */

import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const ToastErrors = (error, toast, navigate) => {
  if (error === 403) {
    toast(
      (t) => (
        <span>
          Please{" "}
          <button
            className="toast-error_btn"
            onClick={() => {
              navigate("/user/login");
              toast.dismiss(t.id);
            }}>
            Login
          </button>{" "}
          to continue
        </span>
      ),
      {
        icon: (
          <BiErrorCircle
            style={{ fontSize: "1.2rem", color: "rgb(218, 35, 35)" }}
          />
        ),
      }
    );
  }
  if (error.status === 500) {
    toast.error("Server error please refresh and try again");
  }
  if (error.status === 422) {
    toast.error("Invalid data");
  }
  if (error.status === 402) {
    toast.error("Not authenticated");
  }
};

export default ToastErrors;
