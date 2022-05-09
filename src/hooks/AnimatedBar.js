/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AnimatedBar = (fetchProducts) => {
  const location = useLocation();
  const [authState, setAuthState] = useState(null);

  function postitionofBar(bar) {
    const position = document
      .querySelector(".animate-bar")
      .style.left.split("%")[0];

    if (position === "-100") {
      bar.style.left = `${100}%`;
    }
    if (position === "100") {
      bar.style.left = `${-100}%`;
    }
    if (position === "0") {
      bar.style.left = `${-100}%`;
    }
    if (!position) {
      bar.style.left = `${-100}%`;
    }
  }
  useEffect(() => {
    const path = location.pathname;

    let bar = document.querySelector(".animate-bar");

    if (path === "/") {
      postitionofBar(bar);
    }
    if (path === "/categ/options") {
      fetchProducts();
      postitionofBar(bar);
    }
    if (path === "/product/list") {
      postitionofBar(bar);
    }
    if (path === "/create/product") {
      postitionofBar(bar);
    }
    if (path === "/get/user") {
      postitionofBar(bar);
    }
  }, [location.pathname]);

  return;
};

export default AnimatedBar;
