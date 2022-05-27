/** @format */

import React, { useEffect, useRef, useState } from "react";
import { BiHome, BiLogIn } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import {
  AiOutlineCloudUpload,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Badge from "@mui/material/Badge";
import "./Navbar.styles.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { LogoutUser } from "../actions/auth/auth";

const Navbar = ({ auth, LogoutUser, user }) => {
  const [navState, setNavState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef();

  // setTimeout(() => {
  //   const home = document.querySelector(".home-container");
  //   if (navState) {
  //     home.style.marginLeft = "18rem";
  //   } else {
  //     home.style.marginLeft = "0rem";
  //   }
  // }, 10);
  const handleNavigation = (path) => {
    navigate(path);
    setNavState(!navState);
    // setTimeout(() => {
    //   document.querySelector(".animate-bar").style.left = `${100}%`;
    // }, 2000);
  };

  useEffect(() => {
    if (location.pathname === "/product/list") {
      document
        .querySelectorAll(".navspan")
        .forEach((item) => (item.style.backgroundColor = "white"));
    } else {
      document
        .querySelectorAll(".navspan")
        .forEach((item) => (item.style.backgroundColor = "white"));
    }
  }, [location.pathname]);

  document.addEventListener("click", (e) => {
    if (!e.target) return;
    if (!navRef.current) return;
    if (!navRef.current.contains(e.target)) {
      setNavState(false);
    }
  });

  return (
    <div ref={navRef} className="nav-container">
      <div
        className={
          navState ? "nav-contents nav-contents-active" : "nav-contents"
        }>
        {auth && (
          <div className="nav-profile">
            <img src={user?.profileUrl} alt="error" />
            <Link to={"/get/user/" + user._id}>
              <span>{user.firstname}</span>
            </Link>
          </div>
        )}
        <div className="nav-items">
          <div
            className={navState ? "nav-icon nav-icon-active" : "nav-icon"}
            onClick={() => setNavState(!navState)}>
            <span className="navspan"></span>
            <span className="navspan"></span>
            <span className="navspan"></span>
          </div>
          <ul>
            <li onClick={() => handleNavigation("/")}>
              <BiHome className="navbar-icon" />
              Home
            </li>
            {auth && (
              <li
                onClick={() =>
                  handleNavigation("/get/user/" + user._id + "#products")
                }>
                <VscAccount className="navbar-icon" /> Account
              </li>
            )}
            {auth && (
              <li
                onClick={() =>
                  handleNavigation("/get/user/" + user._id + "#cart")
                }>
                <Badge badgeContent={user.cart?.items?.length} color="primary">
                  <div className="badge-item_flex">
                    <AiOutlineShoppingCart className="navbar-icon" />
                    Cart
                  </div>
                </Badge>
              </li>
            )}
            {auth && (
              <li onClick={() => handleNavigation("/create/product")}>
                <AiOutlineCloudUpload className="navbar-icon" /> Upload
              </li>
            )}
            {auth ? (
              <li
                onClick={async () => {
                  await LogoutUser(navigate);
                  handleNavigation("/");
                }}>
                <AiOutlineLogout className="navbar-icon" /> Logout
              </li>
            ) : (
              <li
                onClick={() => {
                  sessionStorage.setItem("redirect", window.location.pathname);
                  handleNavigation("/user/login");
                }}>
                <BiLogIn className="navbar-icon" />
                Login
              </li>
            )}
          </ul>
        </div>
        <div className="copyright">
          <span className="copyright_span">Copyright © karthik 2022</span>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    auth: state.User.auth,
    user: state.User.userDetails,
  };
};

export default connect(mapStatetoProps, { LogoutUser })(Navbar);
