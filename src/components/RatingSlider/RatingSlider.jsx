/** @format */

import React, { useRef, useState } from "react";
import {
  BsArrowLeftCircle,
  BsArrowLeftShort,
  BsArrowRightCircle,
  BsArrowRightShort,
} from "react-icons/bs";
import { MdStar } from "react-icons/md";

const RatingSlider = ({ selproduct }) => {
  const imgRef = useRef();
  const [imgIndex, setImgIndex] = useState(0);
  const ratingsArray = selproduct?.rating;

  return (
    <div className="selproduct-product-ratings">
      <h2 className="rating-h2">
        <MdStar /> Ratings
      </h2>
      <div className="selproduct-product_rating-box">
        <div className="selproduct-product_rating-user">
          <div
            className="selproduct-p"
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}>
            {ratingsArray?.map(({ user }) => (
              <img src={user.profileUrl} key={user._id} alt="error" />
            ))}
          </div>
        </div>
        <div className="selproduct-product-raitng_details">
          <h2>{ratingsArray && ratingsArray[imgIndex]?.user.username}</h2>
          <span>
            Rated {ratingsArray && ratingsArray[imgIndex]?.value} stars{" "}
          </span>
          <div className="arrow_icons">
            <button
              onClick={() => {
                if (imgIndex <= 0) {
                  return setImgIndex(ratingsArray.length - 1);
                }
                setImgIndex(imgIndex - 1);
              }}>
              <BsArrowLeftShort className="arrow_icon" />
            </button>
            <button
              onClick={() => {
                if (imgIndex >= ratingsArray.length - 1) {
                  return setImgIndex(0);
                }
                setImgIndex(imgIndex + 1);
              }}>
              <BsArrowRightShort className="arrow_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSlider;
