/** @format */

import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import CartTotal from "../../hooks/CartTotal";
import Button from "../button/Button";
import CartItems from "../cartItems/CartItems";
import WordConvertor from "../currency/toWords";
import Gippy from "../Gipphy/Gippy";
import Model from "../model/Model";
import { motion } from "framer-motion";
const UserCart = ({ userData }) => {
  const cartTotal = CartTotal(userData);
  const [btnState, setBtnState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const modelCallback = (value) => {
    setBtnState(value);
  };

  return (
    <div className="usercart-container">
      <AnimatePresence>
        <Model
          state={modalState}
          setState={setModalState}
          cb={modelCallback}
          text={"Do you want to place the order?"}
        />
      </AnimatePresence>
      <div className="usercart-actions">
        <div className="usercart-bar">
          <div>
            <h2>Cart Total</h2>
            <p>Rs: {cartTotal}</p>
            <span className="usercart-total_words">
              {cartTotal && WordConvertor(cartTotal.split(",").join(""))}
            </span>
          </div>
          {/* <div className="items-orderd">
            <p>Total Items</p>
            <span>{userData?.cart?.items?.length}</span>
          </div> */}
        </div>
        <div className="usercart-order">
          <button
            className={
              btnState
                ? "usersetting-btn-active usersetting-btn"
                : "usersetting-btn"
            }
            onClick={() => {
              !btnState && setModalState(true);
            }}>
            <Button
              state={btnState}
              name={btnState ? "Placing Order" : "Place Order"}
            />
          </button>
        </div>
      </div>

      <motion.div layout className="cart-items-list">
        {userData?.cart?.items.length > 0 ? (
          userData?.cart?.items.map(
            ({ product, quantity }) =>
              product && <CartItems product={product} quantity={quantity} />
          )
        ) : (
          <div className="cart-item_empty">
            <Gippy />
            <h3>No Items found</h3>s
            <Link to="/categ/options">
              <span>Add now</span>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserCart;
