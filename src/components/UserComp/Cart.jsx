/** @format */

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import CartTotal from "../../hooks/CartTotal";
import Button from "../button/Button";
import CartItems from "../cartItems/CartItems";
import WordConvertor from "../currency/toWords";

import Model from "../model/Model";
import { motion } from "framer-motion";

import EmptyLoader from "../loader/EmptyLoader";
import { PaymentGateWay } from "../Payment/Razorpay";
import { backendApi } from "../api/api";
import { getCurrency } from "../getCurrency";
import toast from "react-hot-toast";
import ToastErrors from "../errors/ToastErrors";
import ReactConfitte from "../ReactConfitte";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../actions/User";
import { getLocationCurrency } from "../getLocationCurrency";
import GetPrice from "../GetPrice";

const UserCart = ({ userData, state }) => {
  const cartTotal = CartTotal(userData);
  const auth = useSelector((state) => state.User.auth);
  const [btnState, setBtnState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [confettiState, setconfettiState] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cb = (value, text) => {
    if (value) {
      toast.success("Payment verified");
      dispatch(fetchUserDetails());

      setconfettiState(true);
      setTimeout(() => {
        setconfettiState(false);
      }, 4000);
    } else {
      toast.error(text);
    }
    setBtnState(false);
  };

  const modelCallback = async (value) => {
    if (value) {
      const currency = await getLocationCurrency(userData, auth);
      console.log(currency);
      try {
        const { data } = await backendApi.get(
          "/order/create/" + cartTotal + "?currency=" + currency
        );

        PaymentGateWay(data, userData, cb, toast, navigate, currency);
      } catch (error) {
        ToastErrors(error.response.status, toast, navigate);
        setBtnState(false);
        if (error.response.status === 400) {
          if (currency !== "INR") {
            toast.error(
              "Currency " + currency + " Is not supported for payment."
            );
          } else {
            toast.error("There was a error please try again later");
          }
        }
      }
    } else {
      setBtnState(false);
    }
  };

  return (
    <div className="usercart-container">
      {state === "cart" && (
        <React.Fragment>
          <ReactConfitte state={confettiState} setState={setconfettiState} />
          <AnimatePresence>
            <Model
              state={modalState}
              setState={setModalState}
              cb={modelCallback}
              text={"Do you want to place the order?"}
            />
          </AnimatePresence>
        </React.Fragment>
      )}
      {state === "cart" && (
        <div className="usercart-actions">
          <div className="usercart-bar">
            <div>
              <h2>Cart Total</h2>
              <p>
                <GetPrice userData={userData} /> : {getCurrency(cartTotal)}
              </p>
              <span className="usercart-total_words">
                {cartTotal && WordConvertor(cartTotal)}
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
                setBtnState(true);
              }}>
              <Button
                state={btnState}
                name={btnState ? "Placing Order" : "Place Order"}
              />
            </button>
          </div>
        </div>
      )}
      {state === "orders" && (
        <div className="order-container">
          <h1>Test website</h1>
        </div>
      )}
      {state === "cart" && (
        <motion.div layout className="cart-items-list">
          {userData?.cart?.items.length > 0 ? (
            userData?.cart?.items.map(
              ({ product, quantity }) =>
                product && (
                  <CartItems
                    product={product}
                    quantity={quantity}
                    state={state}
                    userData={userData}
                  />
                )
            )
          ) : (
            <div>
              {/* <NoItems text="Add now" path="/categ/options" /> */}
              <EmptyLoader state="cart" />
            </div>
          )}
        </motion.div>
      )}
      {state === "orders" && (
        <motion.div layout className="cart-items-list">
          {userData?.order?.products.length > 0 ? (
            userData?.order?.products.map(
              ({ product_id, quantity, payment_id, orderId }) =>
                product_id && (
                  <CartItems
                    product={product_id}
                    quantity={quantity}
                    state={state}
                    payment_id={payment_id}
                    order_id={orderId}
                    userData={userData}
                  />
                )
            )
          ) : (
            <div>
              {/* <NoItems text="Add now" path="/categ/options" /> */}
              <EmptyLoader state="cart" />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserCart;
