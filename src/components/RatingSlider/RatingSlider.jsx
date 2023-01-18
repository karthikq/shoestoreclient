/** @format */

import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { MdStar } from "react-icons/md";

const RatingSlider = ({ selproduct, state, header, imgWidth }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const ratingsArray = selproduct;

  const [imgwidth, setImgWidth] = useState(160);

  useEffect(() => {
    getImageWidth();
    window.addEventListener("resize", getImageWidth);
    return () => {
      window.removeEventListener("resize", getImageWidth);
    };
  }, []);
  const getImageWidth = () => {
    const width = document.querySelector(
      ".selproduct-product_rating-user"
    )?.offsetWidth;
    setImgWidth(width);
  };

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
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {state
              ? ratingsArray?.map(({ user }, index) => (
                  <div
                    key={index}
                    id={imgwidth}
                    className="selproduct-p-user_img"
                    style={{
                      width: `${imgwidth}px`,
                    }}
                  >
                    <img
                      style={{
                        width: `${imgwidth}px`,
                        color: imgwidth,
                      }}
                      src={
                        user.profileUrl
                          ? user.profileUrl
                          : "https://i.ibb.co/L9b91gT/Avatar-Maker.png"
                      }
                      key={user._id}
                      alt="error"
                    />
                  </div>
                ))
              : ratingsArray?.map(({ userId }, index) => (
                  <div
                    key={index}
                    className="selproduct-p-user_img"
                    style={{
                      width: `${imgwidth}px !important`,
                      color: imgwidth,
                    }}
                  >
                    <img
                      style={{
                        width: `${imgwidth}px`,
                        color: imgwidth,
                      }}
                      src={
                        userId.profileUrl
                          ? userId.profileUrl
                          : "https://i.ibb.co/L9b91gT/Avatar-Maker.png"
                      }
                      key={userId._id}
                      alt="error"
                    />{" "}
                  </div>
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
          {state && (
            <React.Fragment>
              <span>
                Rated {ratingsArray && ratingsArray[imgIndex]?.value} stars{" "}
              </span>{" "}
              <p className="rating_text">
                "{ratingsArray && ratingsArray[imgIndex]?.text}"
              </p>
            </React.Fragment>
          )}
          <div className="arrow_icons">
            <button
              disabled={ratingsArray?.length <= 1}
              onClick={() => {
                if (imgIndex <= 0) {
                  return setImgIndex(ratingsArray.length - 1);
                }
                setImgIndex(imgIndex - 1);
              }}
            >
              <BsArrowLeftShort className="arrow_icon" />
            </button>
            <button
              disabled={ratingsArray?.length <= 1}
              onClick={() => {
                if (imgIndex >= ratingsArray.length - 1) {
                  return setImgIndex(0);
                }
                setImgIndex(imgIndex + 1);
              }}
            >
              <BsArrowRightShort className="arrow_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSlider;
