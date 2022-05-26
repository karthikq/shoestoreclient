/** @format */

import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiTwotoneLike,
} from "react-icons/ai";
import "./selproduct.styles.scss";
import { motion } from "framer-motion";

import { BiCart, BiLike } from "react-icons/bi";
import _ from "lodash";
import ImageSlider from "../../components/ImageSlider";
import { connect, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  addRating,
  removeRating,
  singleProduct,
  updateLike,
} from "../../components/actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { addtocart, userAddtofav } from "../../components/actions/User";
import ReactConfitte from "../../components/ReactConfitte";

import Rating from "@mui/material/Rating";

import MenuDropdown from "../../components/ProductActions/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductTabs } from "../../components/ProductActions/Actiontabs";
import BackdropLoader from "../../components/loader/Backdrop";
import SelprodSkelLoader from "../../components/loader/SelprodSkelLoader";
import SelproductDetails from "../../components/selprodDetails/SelproductDetails";
import { FetchSimilarprod } from "../../components/actions/Similar";
import { async } from "@firebase/util";
import { BsLightning } from "react-icons/bs";
import toast from "react-hot-toast";
import GetPrice from "../../components/GetPrice";

const Selproduct = ({ selproduct, userData, auth }) => {
  const [addUserRating, setAddUserRating] = useState(false);
  const [confettiState, setconfettiState] = useState(false);
  const [readMore, setreadMore] = useState(false);
  const [review, setReview] = useState({
    rating: "",
    text: "",
  });

  // const [selProduct, setSelproduct] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [id]);
  useEffect(() => {
    if (selproduct) {
      const res = selproduct?.rating?.find((item) => {
        return item.user._id === userData._id && item;
      });
      res &&
        setReview({
          text: res.text,
          rating: res.value,
        });
    }
  }, [selproduct]);

  const changeproductRating = async (newrating, name) => {
    // setAddUserRating(false);

    setReview({ ...review, rating: newrating });
  };

  const totalLikes = _.sum(selproduct?.likes?.map((item) => item.count));

  //   <StarRatings
  //   rating={
  //     addUserRating
  //       ? 0
  //       : Math.floor(
  //           selproduct.totalRating ? selproduct.totalRating : 0
  //         )
  //   }
  //   starRatedColor="#e02957"
  //   numberOfStars={5}
  //   starDimension="20px"
  //   starSpacing="1px"
  //   name="rating"
  //   changeRating={addUserRating && changeproductRating}
  // />
  const handleReview = async () => {
    setAddUserRating(false);

    if (!review.rating) {
      return toast.error("Please add a rating and try again");
    }

    await dispatch(addRating(selproduct.p_id, review, navigate));
    if (review.rating === 5) {
      setconfettiState(true);
    }

    setTimeout(() => {
      setconfettiState(false);
    }, [4000]);
  };
  const handleBuy = () => {
    navigate("/get/user/" + userData._id + "#cart");
  };

  return (
    <React.Fragment>
      <ReactConfitte state={confettiState} setState={setconfettiState} />
      <BackdropLoader open={!selproduct} />
      {!selproduct && <SelprodSkelLoader />}
      {selproduct && (
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.8 }}
          className="selproduct-container">
          {selproduct && (
            <div className="bg-image">
              <img src={selproduct?.p_img} alt="bg" className="bg-image_main" />
            </div>
          )}
          <div className="selproduct-close" onClick={() => navigate(-1)}>
            <AiOutlineClose className="selproduct-close_icon" />
          </div>
          <motion.div layout="position" className="selproduct-contents">
            <div className="selproduct-contents_flex">
              {selproduct && userData && (
                <div className="selproduct-options">
                  <MenuDropdown
                    loginUser={userData}
                    postUser={selproduct}
                    product={selproduct}
                  />
                </div>
              )}
              <div className="selproduct-img">
                {/* <img src={selproductState.data.p_img[0]} alt="err" /> */}
                {selproduct && (
                  <ImageSlider
                    imagesArray={selproduct.p_img}
                    imgClass="selproduct-main_img"
                  />
                )}
              </div>
              <div
                className={
                  selproduct?.likes?.length > 0
                    ? "selproduct-details selproduct-details_content"
                    : "selproduct-details"
                }>
                {selproduct && userData && (
                  <div className="selproduct-options_details">
                    <MenuDropdown
                      loginUser={userData}
                      postUser={selproduct}
                      product={selproduct}
                    />
                  </div>
                )}
                {/*   <div className="selproduct-created_user">
              <div className="selproduct-created_user-details">
                  <img
                    src="https://images.pexels.com/photos/4460483/pexels-photo-4460483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="userimage"
                  />
                  <p className="selproduct-created_p">Username</p>
                </div>
                </div>  */}
                <h2 className="selproduct-h2">{selproduct.p_name}</h2>{" "}
                {selproduct.p_desp && (
                  <div className="p_desp-div">
                    {!readMore ? (
                      <span className="p_desp">
                        {selproduct.p_desp.substring(0, 100) + "..."}
                        <span
                          className="p_desp_more"
                          onClick={() => setreadMore(true)}>
                          show more
                        </span>
                      </span>
                    ) : (
                      <span className="p_desp">
                        {selproduct.p_desp + " "}
                        <span
                          className="p_desp_more"
                          onClick={() => setreadMore(false)}>
                          show less
                        </span>
                      </span>
                    )}
                  </div>
                )}
                <div className="selproduct-price">
                  <span className="selproduct-price_span">
                    Price : <GetPrice userData={userData} /> {selproduct.price}
                  </span>
                </div>
                <div className="sel-product_rating">
                  <div className="sel-product-rating_items">
                    {selproduct && (
                      <Rating
                        name="simple-controlled"
                        value={
                          addUserRating
                            ? review.rating
                            : Math.floor(
                                selproduct.totalRating
                                  ? selproduct.totalRating
                                  : 0
                              )
                        }
                        readOnly={!addUserRating}
                        onChange={(event, newValue) => {
                          if (addUserRating) changeproductRating(newValue);
                        }}
                      />
                    )}
                    <span className="p_rating">
                      {selproduct.totalRating?.toFixed(2)}
                    </span>
                  </div>{" "}
                  {addUserRating && (
                    <div className="p_form-message">
                      <textarea
                        value={review.text}
                        onChange={(e) =>
                          setReview({ ...review, text: e.target.value })
                        }
                        maxLength={50}
                        name="review"
                        cols="30"
                        rows="3"></textarea>

                      <div className="p_form-details">
                        <p
                          onClick={handleReview}
                          className="selproduct-rating_p">
                          Submit
                        </p>
                        <p
                          onClick={() => {
                            setAddUserRating(false);
                          }}
                          className="selproduct-rating_p">
                          Cancel
                        </p>
                      </div>
                    </div>
                  )}
                  {auth
                    ? selproduct?.rating?.find(
                        (user) => user?.user?._id === userData._id
                      )
                      ? !addUserRating && (
                          <p
                            className="selproduct-rating_p"
                            onClick={() => {
                              setAddUserRating(true);
                              // dispatch(removeRating(selproduct.p_id, navigate));
                            }}>
                            change Review
                          </p>
                        )
                      : !addUserRating && (
                          <p
                            className="selproduct-rating_p"
                            onClick={() => setAddUserRating(true)}>
                            Add Review
                          </p>
                        )
                    : ""}
                </div>
                <div className="selproduct-actions">
                  <div className="selproduct-like_div">
                    {selproduct?.likes?.find(
                      (user) => user.userId?._id === userData?._id
                    ) ? (
                      <AiTwotoneLike
                        className="selproduct-like_icon"
                        onClick={() => {
                          dispatch(updateLike(selproduct?.p_id, navigate));
                        }}
                      />
                    ) : (
                      <BiLike
                        className="selproduct-like_icon"
                        onClick={() => {
                          dispatch(updateLike(selproduct?.p_id, navigate));
                        }}
                      />
                    )}
                    <span className="sel-product_like-span"> {totalLikes}</span>
                  </div>
                  {userData &&
                  userData.favProducts?.find(
                    (item) => item.product._id === selproduct._id
                  ) ? (
                    <FavoriteIcon
                      className="selproduct-fav_icon selproduct-fav_icon-active"
                      onClick={() =>
                        dispatch(userAddtofav(selproduct._id, false, navigate))
                      }
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="selproduct-fav_icon"
                      onClick={() =>
                        dispatch(userAddtofav(selproduct._id, true, navigate))
                      }
                    />
                  )}{" "}
                  {/* <AiOutlineShoppingCart
                    className="selproduct-cart_icon"
                    onClick={() =>
                      dispatch(addtocart(selproduct._id, navigate))
                    }
                  /> */}
                </div>
                <div className="sel-product-tags">
                  {selproduct?.keywords?.map((el) => (
                    <span key={el} className="selproduct_tag-span">
                      {"#" + el}
                    </span>
                  ))}
                </div>
                <div className="selproduct_buy">
                  <button
                    className="selproduct_buy-btn cart_btn"
                    onClick={() =>
                      dispatch(addtocart(selproduct._id, navigate))
                    }>
                    <BiCart className="cart_icon" />
                    Add to Cart
                  </button>
                  <button className="selproduct_buy-btn" onClick={handleBuy}>
                    <BsLightning className="buy_icon" /> Buy Now
                  </button>
                </div>
                {/* <div className="selproduct-usage">
                  <ProductTabs
                    likes={selproduct?.likes}
                    ratings={selproduct?.rating}
                    views={selproduct.viewCount}
                    selproduct={selproduct}
                  />
                </div> */}
              </div>{" "}
            </div>
            {selproduct && <SelproductDetails selproduct={selproduct} />}
          </motion.div>
        </motion.div>
      )}
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    selproduct: state.Products.length > 1 ? "" : state.Products[0],
    userData: state.User.userDetails,

    auth: state.User.auth,
  };
};

export default connect(mapStatetoProps)(Selproduct);
