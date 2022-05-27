/** @format */

import React, { useEffect, useState } from "react";
import "./home.styles.scss";

import { motion } from "framer-motion";

import { connect } from "react-redux";
import { fetchProducts, singleProduct } from "../../components/actions";

import RadiusBtn from "../../components/button/RadiusBtn";
import Typewriter from "typewriter-effect";

const Home = ({ products, fetchProducts, singleProduct }) => {
  // fetchProducts();

  const [selVideo, setSelVideo] = useState(2);
  useEffect(() => {
    setSelVideo(Math.floor(Math.random() * 3) + 1);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
      className="home-container">
      <div className="home-bg-video">
        <video autoPlay playsInline loop>
          <source src={`../videos/${selVideo}.mp4`} />
        </video>
      </div>
      <div className="home-contents">
        <h1>
          EXPLORE{" "}
          <span id="type_span">
            <Typewriter
              options={{ loop: true }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Latest Shoes")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Watches")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Games")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Electornic's")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
            />
          </span>
        </h1>
        <RadiusBtn path="/categ/options" type={"button"} />
      </div>
    </motion.div>
  );
};

const mapStatetoProps = (state) => {
  return { products: state.Products };
};

export default connect(mapStatetoProps, {
  fetchProducts,
  singleProduct,
})(Home);
