/** @format */

import React, { useRef } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import RatingSlider from "../RatingSlider/RatingSlider";
import "./selproduct.styles.scss";

const SelproductDetails = ({ selproduct }) => {
  return (
    <div className="selproduct-product_container">
      <div className="selproduct-product_contents">
        <div className="selproduct-product_similar"></div>
        <div className="selproduct-product_user">
          <div className="selproduct-product_user-img">
            <img
              src="https://images.pexels.com/photos/11240200/pexels-photo-11240200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="err"
            />{" "}
            <h1>
              Posted by <span>username</span>
            </h1>
          </div>
        </div>
        <RatingSlider selproduct={selproduct} />

        <div className="selproduct-product_details"></div>
      </div>
    </div>
  );
};
export default SelproductDetails;
