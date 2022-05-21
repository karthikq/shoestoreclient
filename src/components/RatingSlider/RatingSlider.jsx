/** @format */

import React, { useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import {
  BsArrowLeftCircle,
  BsArrowLeftShort,
  BsArrowRightCircle,
  BsArrowRightShort,
} from "react-icons/bs";
import { MdStar } from "react-icons/md";

const RatingSlider = ({ selproduct, state, header }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const ratingsArray = selproduct;

  return (
    <div className="selproduct-product-ratings">
      <h2 className="rating-h2">
        {state ? <MdStar /> : <AiFillLike />}
        {header}
      </h2>
      <div className="selproduct-product_rating-box">
        <div className="selproduct-product_rating-user">
          <div
            className="selproduct-p"
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}>
            {state
              ? ratingsArray?.map(({ user }) => (
                  <img src={user.profileUrl} key={user} alt="error" />
                ))
              : ratingsArray?.map(({ userId }) => (
                  <img src={userId.profileUrl} key={userId} alt="error" />
                ))}
          </div>
        </div>
        <div className="selproduct-product-raitng_details">
          {state && (
            <h2>{ratingsArray && ratingsArray[imgIndex]?.user.firstname}</h2>
          )}
          {!state && (
            <h2>{ratingsArray && ratingsArray[imgIndex]?.userId.firstname}</h2>
          )}
          <span>
            Rated {ratingsArray && ratingsArray[imgIndex]?.value} stars{" "}
          </span>{" "}
          <span> {ratingsArray && ratingsArray[imgIndex]?.text}</span>
          <div className="arrow_icons">
            <button
              disabled={ratingsArray?.length <= 1}
              onClick={() => {
                if (imgIndex <= 0) {
                  return setImgIndex(ratingsArray.length - 1);
                }
                setImgIndex(imgIndex - 1);
              }}>
              <BsArrowLeftShort className="arrow_icon" />
            </button>
            <button
              disabled={ratingsArray?.length <= 1}
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
