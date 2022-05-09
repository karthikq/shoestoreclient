/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Gippy from "../Gipphy/Gippy";
import "./error.styles.scss";

const NoItems = ({ text, path }) => {
  return (
    <div className="cart-item_empty">
      <Gippy />
      <h3>No Items found</h3>
      <Link to={path}>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default NoItems;
