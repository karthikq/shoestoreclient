/** @format */

import React, { useEffect, useState } from "react";
import "./user.styles.scss";
import { GiConverseShoe } from "react-icons/gi";
import { MdFavorite, MdOutlineMail } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import Userproducts from "../../components/UserComp/Userproducts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { BiUserCircle } from "react-icons/bi";

import { useLocation } from "react-use";
import UsernavList from "./UsernavList";
import { FiSettings } from "react-icons/fi";
import UserSettings from "../../components/UserComp/UserSettings";
import Productbox from "../../components/Product/Productbox";
import Cart from "../../components/UserComp/Cart";
import { motion } from "framer-motion";
import { fetchIndUser } from "../../components/actions/User";
import { fetchProducts } from "../../components/actions";

const User = ({ userData, userProducts, auth, foundUser }) => {
  const location = useLocation();
  const disptach = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    disptach(fetchProducts());
    disptach(fetchIndUser(id));
  }, [id]);

  const [parseState, setParseState] = useState("");

  useEffect(() => {
    // if (!location.hash) {
    //   window.location.hash = "#products";
    // }
    const parse = location.hash?.split("#")[1]?.toLowerCase();
    setParseState(parse);
  }, [location.hash]);

  return (
    <div className="user-container">
      <div className="user-contents">
        <div className="user-profile">
          <img
            src={
              foundUser.profileUrl
                ? foundUser.profileUrl
                : "https://i.ibb.co/3734bpp/avataaars-1.png"
            }
            alt="profile_img"
          />
          {/* <div className="profile-img_update">
            <p>Change profile pic</p>
          </div> */}
          <div className="user-profile_details">
            <span className="user-profile_span">
              <BiUserCircle className="user-profile_mail-icon" /> :
              {foundUser.username?.split(" ")[0]}
            </span>
            <span className="user-profile_span">
              <MdOutlineMail className="user-profile_mail-icon" /> Mail to :
              <a
                style={{ color: "#888888" }}
                href={"mailto:" + foundUser.email}>
                {foundUser.email}
              </a>
            </span>
          </div>
        </div>
        <div className="user-details">
          <div className="user-details_nav">
            <ul>
              <UsernavList
                icon={<GiConverseShoe />}
                parseState={parseState}
                path="products"
                name="Products"
              />

              <UsernavList
                icon={<MdFavorite />}
                parseState={parseState}
                path="fav"
                name="Favouritie's"
              />
              <UsernavList
                icon={<AiOutlineShoppingCart />}
                parseState={parseState}
                path="cart"
                name="Cart"
              />
              <UsernavList
                icon={<FiSettings />}
                parseState={parseState}
                path="settings"
                name="Settings"
              />
              <UsernavList
                icon={<BsCheckCircle />}
                parseState={parseState}
                path="orders"
                name="Orders"
              />
            </ul>
          </div>
          <motion.div className="user-details_items">
            {parseState === "products" &&
              userProducts.map(
                (item) => item && <Productbox item={item} key={item._id} />
              )}
            {foundUser._id === userData._id &&
              parseState === "fav" &&
              userData?.favProducts?.map(
                ({ product }) =>
                  product && <Productbox item={product} key={product._id} />
              )}
            {foundUser._id === userData._id && parseState === "cart" && (
              <Cart userData={userData} />
            )}
            {foundUser._id === userData._id && parseState === "settings" && (
              <UserSettings userData={userData} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state, props) => {
  const userData = state.User.userDetails;
  const foundUser = state.User.foundUserDetails;

  return {
    userData: userData,
    auth: state.User.auth,
    foundUser,
    userProducts:
      foundUser._id === userData._id
        ? state.Products.filter((prod) => {
            return prod.userId === userData._id && prod;
          })
        : state.Products.filter((prod) => {
            return prod.userId === foundUser._id && prod;
          }),
  };
};

export default connect(mapStatetoProps)(User);
