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
import { AiOutlineEye } from "react-icons/ai";

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
              icon: <WhatshotIcon className="product-header_icon" />,
            }}
            state="popular"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={products}
            details={{
              text: "Latest",
              icon: <NewReleasesIcon className="product-header_icon" />,
            }}
            state="latest"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={products}
            details={{
              text: "Most viewed",
              icon: <AiOutlineEye className="product-header_icon" />,
            }}
            state="Viewed"
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
