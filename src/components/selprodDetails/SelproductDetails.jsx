/** @format */

import { Skeleton } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FetchSimilarprod } from "../actions/Similar";
import Productbox from "../Product/Productbox";
import RatingSlider from "../RatingSlider/RatingSlider";
import "./selproduct.styles.scss";

const SelproductDetails = ({ selproduct }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.SimilarItems);

  useEffect(() => {
    if (selproduct) {
      dispatch(FetchSimilarprod(selproduct.p_type));
    }
  }, [selproduct]);
  return (
    <div className="selproduct-product_container">
      <div className="selproduct-product_contents">
        <RatingSlider
          selproduct={selproduct?.likes}
          header="Likes"
          state={false}
        />
        <RatingSlider
          selproduct={selproduct?.rating}
          header="Ratings"
          state={true}
        />
        {productList?.find((item) => item.p_id !== selproduct?.p_id) && (
          <div className="selproduct-product_similar">
            <h2>Similar products</h2>
            <div className="selproduct-product_similar-box">
              {productList ? (
                productList.map((item) => (
                  <Productbox item={item} key={item._id} />
                ))
              ) : (
                <Skeleton variant="rectangular" width={200} height={200} />
              )}
            </div>
          </div>
        )}
        <div className="selproduct-product_user">
          <div className="selproduct-product_user-img">
            <img
              src="https://images.pexels.com/photos/11240200/pexels-photo-11240200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="err"
            />
            <h1>
              Posted by <span>username</span>
            </h1>
          </div>
        </div>
        <div className="selproduct-product_details"></div>
      </div>
    </div>
  );
};
export default SelproductDetails;
