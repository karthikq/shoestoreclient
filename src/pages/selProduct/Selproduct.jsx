/** @format */

import React, { useContext, useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneLike,
} from "react-icons/ai";
import "./selproduct.styles.scss";
import { motion } from "framer-motion";
import StarRatings from "react-star-ratings";
import { BiLike } from "react-icons/bi";
import _ from "lodash";
import ImageSlider from "../../components/ImageSlider";
import { connect, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  addRating,
  removeRating,
  singleProduct,
  updateLike,
  updateViewCount,
} from "../../components/actions";
import { useNavigate, useParams } from "react-router-dom";

import {
  addtocart,
  fetchIndUser,
  userAddtofav,
} from "../../components/actions/User";
import ReactConfitte from "../../components/ReactConfitte";
import { useLocation } from "react-use";
import { ProductContextobj } from "../../context/selProductcontext";
import Rating from "@mui/material/Rating";
import { BsFillHeartFill } from "react-icons/bs";
import MenuDropdown from "../../components/ProductActions/Menu";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductTabs } from "../../components/ProductActions/Actiontabs";

const Selproduct = ({
  setselproductState,
  selproductState,
  selproduct,
  foundUser,
  userData,
}) => {
  const [addUserRating, setAddUserRating] = useState(false);
  const [confettiState, setconfettiState] = useState(false);
  const [readMore, setreadMore] = useState(false);

  const location = useLocation();

  // const [selProduct, setSelproduct] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [id]);

  React.useEffect(() => {
    if (selproduct.userId) {
      dispatch(fetchIndUser(selproduct.userId));
    }
  }, []);

  //
  const changeproductRating = async (newrating, name) => {
    await dispatch(addRating(selproduct.p_id, parseInt(newrating)));
    setAddUserRating(false);

    if (newrating === 5) {
      setconfettiState(true);
    }

    setTimeout(() => {
      setconfettiState(false);
    }, [4000]);
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
  return (
    <React.Fragment>
      <ReactConfitte state={confettiState} setState={setconfettiState} />
      {selproduct && (
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.8 }}
          className="selproduct-container"
          role={"presentation"}>
          <div className="selproduct-close" onClick={() => navigate(-1)}>
            <AiOutlineClose className="selproduct-close_icon" />
          </div>
          <motion.div layout="position" className="selproduct-contents">
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
              <ImageSlider
                imagesArray={selproduct.p_img}
                imgClass="selproduct-main_img"
              />
            </div>
            <div
              className={
                selproduct?.likes?.length > 0
                  ? "selproduct-details selproduct-details_content"
                  : "selproduct-details"
              }>
              <div className="selproduct-created_user">
                {/* <div className="selproduct-created_user-details">
                  <img
                    src="https://images.pexels.com/photos/4460483/pexels-photo-4460483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="userimage"
                  />
                  <p className="selproduct-created_p">Username</p>
                </div> */}
              </div>
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
                      {selproduct.p_desp}
                      <span
                        className="p_desp_more"
                        onClick={() => setreadMore(false)}>
                        show less
                      </span>
                    </span>
                  )}
                </div>
              )}
              <div className="sel-product_rating">
                <div className="sel-product-rating_items">
                  {selproduct && (
                    <Rating
                      name="simple-controlled"
                      value={
                        addUserRating
                          ? 0
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
                </div>
                {selproduct.rating?.find(
                  (user) => user?.user?._id === userData._id
                ) ? (
                  <p
                    onClick={() => {
                      setAddUserRating(true);
                      dispatch(removeRating(selproduct.p_id));
                    }}>
                    change rating
                  </p>
                ) : (
                  !addUserRating && (
                    <p onClick={() => setAddUserRating(true)}>Add rating</p>
                  )
                )}
              </div>
              <div className="selproduct-actions">
                <div className="selproduct-like_div">
                  {selproduct?.likes?.find(
                    (user) => user.userId?._id === userData._id
                  ) ? (
                    <AiTwotoneLike
                      className="selproduct-like_icon"
                      onClick={() => {
                        dispatch(updateLike(selproduct.p_id));
                      }}
                    />
                  ) : (
                    <BiLike
                      className="selproduct-like_icon"
                      onClick={() => {
                        dispatch(updateLike(selproduct.p_id));
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
                <AiOutlineShoppingCart
                  className="selproduct-cart_icon"
                  onClick={() => dispatch(addtocart(selproduct._id, navigate))}
                />
              </div>
              <div className="sel-product-tags">
                {selproduct.keywords?.map((el) => (
                  <span key={el} className="selproduct_tag-span">
                    {"#" + el}
                  </span>
                ))}
              </div>{" "}
              <div className="selproduct-usage">
                <ProductTabs
                  likes={selproduct?.likes}
                  ratings={selproduct?.rating}
                  views={selproduct.viewCount}
                  creator={foundUser}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    selproduct: state.Products[0],
    userData: state.User.userDetails,
    foundUser: state.User.foundUserDetails,
  };
};

export default connect(mapStatetoProps)(Selproduct);
