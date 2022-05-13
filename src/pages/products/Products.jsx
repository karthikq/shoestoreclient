/** @format */

import React, { useEffect, useState } from "react";
import "./product.styles.scss";
import Productbox from "../../components/Product/Productbox";
import { AnimatePresence, motion } from "framer-motion";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

import { connect } from "react-redux";
import { fetchselProduct } from "../../components/actions";
import { BiTrendingUp } from "react-icons/bi";
import ProductsList from "./ProductsList";
import { AiOutlineEye, AiOutlineFire } from "react-icons/ai";
import { WiStrongWind } from "react-icons/wi";

import img1 from "./1.gif";
import img2 from "./2.gif";
import img3 from "./3.gif";

const Products = ({ fetchselProduct, products }) => {
  useEffect(() => {
    fetchselProduct();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "linear" }}
        className="product-container">
        <div className="product-contents">
          <ProductsList
            products={products}
            details={{
              text: "Most popular",
              icon: <AiOutlineFire className="product-header_icon" />,
              img: img1,
            }}
            value="popular"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={products}
            details={{
              text: "New Products",
              icon: <WiStrongWind className="product-header_icon" />,
              img: img2,
            }}
            value="new"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={products}
            details={{
              text: "Most viewed",
              icon: <AiOutlineEye className="product-header_icon" />,
              img: img3,
            }}
            value="viewed"
          />
        </div>
      </motion.div>
      {/* <AnimatePresence>
        {selproductState.state && (
          <Selproduct
            setselproductState={setselproductState}
            selproductState={selproductState}
          />
        )}
      </AnimatePresence> */}
    </>
  );
};
const mapStatetoProps = (state) => {
  return {
    products: state.Products,
  };
};
export default connect(mapStatetoProps, { fetchselProduct })(Products);
