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
  } else {
    toast.error("Error please refresh the page");
  }
};

export default ToastErrors;
