/** @format */

import React, { useContext } from "react";
import "./product.styles.scss";
import { BiCategory, BiHeart } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import StarRatings from "react-star-ratings";
import { connect, useSelector } from "react-redux";
import { singleProduct, updateViewCount } from "../actions";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { addtocart, userAddtofav } from "../actions/User";
import Userfav from "../userActions/Userfav";
import UserCart from "../userActions/UserCart";
import { motion } from "framer-motion";
import { ProductContextobj } from "../../context/selProductcontext";
import Modal from "../model/Model";
import { useDispatch } from "react-redux";
import { removeProduct } from "../actions";

const Productbox = ({ item, userData, updateViewCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = React.useState(false);
  // const products = useSelector((state) => state.Products);
  // console.log(products);
  const { state, setState } = useContext(ProductContextobj);
  const productCb = () => {
    dispatch(removeProduct(item._id, navigate));
  };
  return (
    <React.Fragment>
      <Modal
        state={deleteState}
        setState={setDeleteState}
        cb={productCb}
        text="Do you want to delete this product "
      />
      <motion.div layout className="product-box">
        <div
          className="product-img"
          onClick={async () => {
            await updateViewCount(item.p_id);
            // window.history.pushState("", {}, "/single/product/" + item.p_id);
            navigate("/single/product/" + item.p_id, {
              state: item,
            });
            // setState(true);
          }}>
          {item.p_img?.length >= 0 && (
            <img src={item.p_img[0]} alt={item.p_id} />
          )}
        </div>

        <div className="product-details">
          <h3>{item.p_name}</h3>
          <span className="span_price">Price: ₹{item.price}</span>
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
          <AiOutlineDelete
            onClick={() => setDeleteState(true)}
            className="product_delete-btn"
          />
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
