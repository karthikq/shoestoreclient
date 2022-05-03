/** @format */

import React from "react";
import { BiCategory } from "react-icons/bi";
import UserCart from "../userActions/UserCart";
import UserCat from "../userActions/UserCat";
import Userfav from "../userActions/Userfav";

const Userproducts = ({ item, userData }) => {
  return (
    <div className="user-details_items-box">
      <img
        src={item?.p_img ? item.p_img[0] : "Loading"}
        alt="product_image_url"
        className="user-details_prod-img"
      />
      <div className="user-item_details">
        <h6>{item.p_name}</h6>
        <span>Price : {item.price}</span>
        <span className="user-details_cat-span">
          <BiCategory />:{item?.keywords?.map((el) => el + "  ")}
        </span>
      </div>
      <Userfav userData={userData} item={item} />
      <UserCart item={item} />
    </div>
  );
};

export default Userproducts;
