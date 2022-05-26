/** @format */

import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./toast.styles.scss";

const Toasts = () => {
  return (
    <div className="toast-container">
      <div className="toast-contents">
        <AiOutlineClose className="toast-close_btn" />
        <h1>Welcome</h1>
        {/* <p>your current location is</p> */}
      </div>
    </div>
  );
};

export default Toasts;
