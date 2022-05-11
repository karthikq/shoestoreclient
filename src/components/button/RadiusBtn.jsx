/** @format */

import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const RadiusBtn = ({ path, type, disabled }) => {
  const navigate = useNavigate();
  return (
    <button
      type={type}
      disabled={disabled}
      className="explore-btn"
      onClick={() => {
        // document.querySelector(".animate-bar").style.left = `${-100}%`;
        path && navigate(path);
      }}>
      <BiRightArrowAlt className="explore-icon" />
    </button>
  );
};

export default RadiusBtn;
