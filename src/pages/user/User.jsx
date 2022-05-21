/** @format */

import React, { useEffect, useState } from "react";
import "./user.styles.scss";
import { GiConverseShoe } from "react-icons/gi";
import { MdFavorite, MdOutlineMail } from "react-icons/md";
import {
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
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
import Gippy from "../../components/Gipphy/Gippy";
import NoItems from "../../components/errors/NoItems";
import BackdropLoader from "../../components/loader/Backdrop";
import { hasFlag } from "country-flag-icons";

const User = ({ userData, userProducts, auth, foundUser }) => {
  const location = useLocation();
  const disptach = useDispatch();
  const [loaderState, setLoaderState] = useState(true);
  const [userProfile, setuserProfile] = useState("");

  const { id } = useParams();

  useEffect(() => {
    disptach(fetchProducts());
    disptach(fetchIndUser(id));
    setLoaderState(true);
  }, [id]);

  const [parseState, setParseState] = useState("");

  useEffect(() => {
    // if (!location.hash) {
    //   window.location.hash = "#products";
    // }
    const parse = location.hash?.split("#")[1]?.toLowerCase();
    setParseState(parse);
    setTimeout(() => {
      setLoaderState(false);
    }, 200);
    return () => {
      return setLoaderState(true);
    };
  }, [location.hash]);

  useEffect(() => {
    if (foundUser._id === userData._id) {
      setuserProfile(userData);
    } else {
      setuserProfile(foundUser);
    }
    return () => {
      setuserProfile("");
    };
  }, [foundUser, userData]);

  return (
    <div className="user-container">
      <BackdropLoader open={loaderState} />
      <div className="user-contents">
        <div className="user-profile">
          <img
            className="user-porfile_img"
            src={
              userProfile
                ? userProfile?.profileUrl
                : "https://i.ibb.co/3734bpp/avataaars-1.png"
            }
            alt="profile_img"
          />
          {/* <div className="profile-img_update">
            <p>Change profile pic</p>
          </div> */}
          <div className="user-profile_items">
            <div className="user-profile_details">
              <span className="user-profile_span">
                <BiUserCircle className="user-profile_mail-icon" /> :
                {userProfile.username?.split(" ")[0]}
              </span>
              <span className="user-profile_span">
                <MdOutlineMail className="user-profile_mail-icon" /> Mail to :
                <a
                  style={{ color: "#888888" }}
                  href={"mailto:" + userProfile.email}>
                  {userProfile.email}
                </a>
              </span>
            </div>

            {userProfile?.userLocation && (
              <div className="user-location_details">
                <span>
                  Location :{" "}
                  <img
                    className="country"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${userProfile?.userLocation?.country}.svg`}
                    alt="countryflag"
                  />
                </span>
                <span>Mobile: </span>
              </div>
            )}
          </div>
        </div>
        <div className="user-details">
          <div className="user-details_nav">
            <ul>
              <UsernavList
                icon={<AiOutlineUnorderedList />}
                parseState={parseState}
                path="products"
                name="Products"
              />

              {foundUser._id === userData._id && (
                <React.Fragment>
                  <UsernavList
                    icon={<MdFavorite />}
                    parseState={parseState}
                    path="fav"
                    name="Favourites"
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
                  />{" "}
                </React.Fragment>
              )}
            </ul>
          </div>
          <motion.div className="user-details_items">
            {parseState === "products" ? (
              loaderState ? (
                <BackdropLoader open={loaderState} />
              ) : userProducts.length > 0 ? (
                userProducts.map(
                  (item) => item && <Productbox item={item} key={item._id} />
                )
              ) : (
                <NoItems
                  text="Upload now"
                  path="/create/product"
                  state={true}
                />
              )
            ) : (
              ""
            )}
            {foundUser._id === userData._id && parseState === "fav" ? (
              loaderState ? (
                <BackdropLoader open={loaderState} />
              ) : userData?.favProducts?.length > 0 ? (
                userData.favProducts?.map(
                  ({ product }) =>
                    product && <Productbox item={product} key={product._id} />
                )
              ) : (
                <NoItems text="Add now" path="/categ/options" state={true} />
              )
            ) : (
              ""
            )}
            {foundUser._id === userData._id &&
              parseState === "cart" &&
              (loaderState ? (
                <BackdropLoader open={loaderState} />
              ) : (
                <Cart userData={userData} />
              ))}
            {foundUser._id === userData._id &&
              parseState === "settings" &&
              (loaderState ? (
                <BackdropLoader open={loaderState} />
              ) : (
                <UserSettings userData={userData} />
              ))}
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
