/** @format */

import React, { useContext } from "react";
import "./product.styles.scss";
import { BiCategory, BiHeart } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import StarRatings from "react-star-ratings";
import { connect, useSelector } from "react-redux";
import { singleProduct, updateViewCount } from "../actions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { addtocart, userAddtofav } from "../actions/User";
import Userfav from "../userActions/Userfav";
import UserCart from "../userActions/UserCart";
import { motion } from "framer-motion";
import { ProductContextobj } from "../../context/selProductcontext";
import Modal from "../model/Model";
import { useDispatch } from "react-redux";
import { removeProduct } from "../actions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getLocationCurrency } from "../getLocationCurrency";
import GetPrice from "../GetPrice";

const Productbox = ({ item, userData, viewState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = React.useState(false);
  // const products = useSelector((state) => state.Products);
  // console.log(products);
  const { state, setState } = useContext(ProductContextobj);

  const productCb = (val) => {
    if (val) {
      dispatch(removeProduct(item._id, navigate));
    }
    setDeleteState(false);
  };

  return (
    <React.Fragment>
      <Modal
        state={deleteState}
        setState={setDeleteState}
        cb={productCb}
        text="Do you want to delete this product "
      />
      {/* onClick={() => {
          
            navigate("/single/product/" + item.p_id, {
              state: item,
            });
      
          }} */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="product-box">
        <div
          className="product-img"
          onClick={(e) => {
            if (viewState) {
              window.open(
                "/single/product/" + item.p_id + "?query=" + item.p_type,
                "_blanck"
              );
            } else {
              navigate(
                "/single/product/" + item.p_id + "?query=" + item.p_type,
                {
                  state: item,
                }
              );
            }
          }}>
          {item.p_img?.length >= 0 && (
            <img src={item.p_img[0]} alt={item.p_id} />
          )}
        </div>

        <div className="product-details">
          <h3>{item.p_name}</h3>
          <span className="span_price">
            Price: <GetPrice userData={userData} /> {item.price}
          </span>
          <div className="product-details_cat-span">
            {item?.keywords?.map((el, index) => (
              <span className="span_cat" key={index}>
                {"#" + el}
              </span>
            ))}
          </div>
        </div>

        <Userfav userData={userData} item={item} />
        {item.userId !== userData._id ? (
          <UserCart item={item} userData={userData} />
        ) : (
          location.pathname === "/get/user/" + userData._id && (
            <AiOutlineDelete
              onClick={() => setDeleteState(true)}
              className="product_delete-btn"
            />
          )
        )}
        <div className="star-rating">
          {/* <StarRatings
            rating={item.rating}
            starRatedColor="#FFDD44"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="1px"
          /> */}
        </div>
        {item.totalRating && (
          <div className="product-stars">
            <span className="product-star_span">
              {item.totalRating.toFixed(2)}
              <StarBorderIcon className="product-star_icon" />
            </span>
          </div>
        )}
      </motion.div>
    </React.Fragment>
  );
};
const mapStatetoProps = (state) => {
  return {
    userData: state.User.userDetails,
  };
};

export default connect(mapStatetoProps, {
  updateViewCount,
  userAddtofav,
  addtocart,
})(Productbox);
