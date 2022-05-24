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
import { fetchIndUser } from "../actions/User";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { Link } from "react-router-dom";

const SelproductDetails = ({ selproduct }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.SimilarItems);
  const createdUser = useSelector((state) => state.User.foundUserDetails);

  useEffect(() => {
    if (selproduct) {
      dispatch(FetchSimilarprod(selproduct.p_type));

      dispatch(fetchIndUser(selproduct.userId));
    }
  }, [selproduct]);

  return (
    <div className="selproduct-product_container">
      <div className="selproduct-product_contents">
        {" "}
        <div className="selproduct-product_user">
          <div className="selproduct-product_user-img">
            <img src={createdUser?.profileUrl} alt="err" />
            <h1>
              Posted by{" "}
              <span>
                <Link to={"/get/user/" + createdUser?._id + "#products"}>
                  {createdUser.firstname}
                </Link>
              </span>
            </h1>
          </div>
        </div>
        {selproduct?.likes?.length > 0 && (
          <RatingSlider
            selproduct={selproduct?.likes}
            header="Likes"
            state={false}
          />
        )}{" "}
        {selproduct?.rating?.length > 0 && (
          <RatingSlider
            selproduct={selproduct?.rating}
            header="Ratings"
            state={true}
          />
        )}
        {productList?.find((item) => item.p_id !== selproduct?.p_id) && (
          <div className="selproduct-product_similar">
            <h2>Similar products</h2>

            <SimpleBar className="selproduct-product_similar-box">
              {productList ? (
                productList.map((item) => (
                  <Productbox item={item} key={item._id} viewState={true} />
                ))
              ) : (
                <Skeleton variant="rectangular" width={200} height={200} />
              )}
            </SimpleBar>
          </div>
        )}
        <div className="selproduct-product_details"></div>
      </div>
    </div>
  );
};
export default SelproductDetails;
