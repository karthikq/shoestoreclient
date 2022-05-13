/** @format */

import React from "react";
import lottie from "lottie-web";
const Lottie = (loader, contId) => {

  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector(`#${contId}`),
      animationData: loader,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, [loader,contId]);

  return;
};

export default Lottie;
