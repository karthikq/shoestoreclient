/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addtocart, deleteCartItem, updateCartItems } from "../actions/User";
import { getCurrency } from "../getCurrency";
import Model from "../model/Model";
import { motion } from "framer-motion";
const CartItems = ({ product, quantity, state, order_id, payment_id }) => {
  const [itemTotal, setItemTotal] = useState(0);
  const [removeState, setRemoveState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setItemTotal(getCurrency(quantity * product.price));
  }, [product]);

  const handleQuantity = (state) => {
    if (state) {
      dispatch(addtocart(product._id, navigate));
    } else {
      dispatch(updateCartItems(product._id, navigate));
    }
  };
  const modelCallback = (value) => {
    dispatch(deleteCartItem(product._id, navigate));
  };
  return (
    <motion.div
      className={
        removeState ? "cart-item-box cart-item-box_active" : "cart-item-box"
      }>
      {state === "cart" && (
        <Model
          state={removeState}
          setState={setRemoveState}
          cb={modelCallback}
          text={"Do you want to remove this Item from cart?"}
        />
      )}
      {state === "cart" && (
        <div className="cart-item-remove">
          <AiOutlineCloseCircle
            className={
              removeState
                ? "cart-item-remove_icon cart-item-remove_icon-active"
                : "cart-item-remove_icon"
            }
            onClick={() => setRemoveState(true)}
          />
        </div>
      )}
      <div className="cart-item-left">
        <div className="cart-item-img">
          <Link to={"/single/product/" + product.p_id}>
            <img src={product?.p_img[0]} alt="produt_image" />
          </Link>
        </div>
        <div className="cart-item-details">
          <Link to={"/single/product/" + product.p_id}>
            <h3>{product?.p_name}</h3>
          </Link>
          <span>Rs : {getCurrency(product?.price)}</span>
        </div>
      </div>
      <div className="cart-item-center">
        {state === "cart" && (
          <BiLeftArrow
            className="cart-item-arrow"
            onClick={() => handleQuantity(false)}
          />
        )}
        {state === "cart" ? (
          <span>{quantity}</span>
        ) : (
          <div className="order_details">
            <span>Quanity : {quantity}</span>
            <span>OrderId : {order_id}</span>
            <span>paymentId : {payment_id}</span>
          </div>
        )}
        {state === "cart" && (
          <BiRightArrow
            className="cart-item-arrow"
            onClick={() => handleQuantity(true)}
          />
        )}
      </div>
      <div className="cart-item-right">
        <p>Total Rs: {itemTotal}</p>
      </div>
    </motion.div>
  );
};

export default CartItems;
