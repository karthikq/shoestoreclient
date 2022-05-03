/** @format */

import React from "react";
import { BiCategory } from "react-icons/bi";
import "./useractions.styles.scss";

const UserCat = ({ item }) => {
  return (
    <span className="product-details_cat-span">
      <BiCategory />: {item?.keywords?.map((el) => el + "  ")}
    </span>
  );
};

export default UserCat;
