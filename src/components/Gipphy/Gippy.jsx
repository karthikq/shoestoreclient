/** @format */

import React from "react";
import gippy from "./1.gif";
import "./gippy.styles.scss";

const Gippy = ({ itemClass }) => {
  return (
    <div className={itemClass ? itemClass : "gippy-img"}>
      <img src={gippy} alt="error" />
    </div>
  );
};

export default Gippy;
