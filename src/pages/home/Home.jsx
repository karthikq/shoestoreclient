/** @format */

import React, { useEffect, useState } from "react";
import "./home.styles.scss";
import { BiRightArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { fetchProducts, singleProduct } from "../../components/actions";
import { getProducts } from "../../redux/product";
import RadiusBtn from "../../components/button/RadiusBtn";
import Typewriter from "typewriter-effect";

const Home = ({ products, fetchProducts, singleProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetchProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
      className="home-container">
      <div className="home-bg-video">
        <video autoPlay>
          <source src="../videos/3.mp4" />
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
