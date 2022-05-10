/** @format */

import React, { useEffect, useState } from "react";
import "./product.styles.scss";
import Productbox from "../../components/Product/Productbox";
import { AnimatePresence, motion } from "framer-motion";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { connect } from "react-redux";
import { fetchselProduct } from "../../components/actions";

const Products = ({ fetchselProduct, products }) => {
  const productref = React.useRef();

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
          <div className="product-header">
            <h4>Most Popular</h4>
            <div className="product-arrow_icons">
              <span
                className="product-arrow_icon"
                onClick={() =>
                  (document.querySelectorAll(
                    ".product-trending"
                  )[0].scrollLeft -= 500)
                }>
                <FiArrowLeft />
              </span>
              <span
                className="product-arrow_icon"
                onClick={() =>
                  (document.querySelectorAll(
                    ".product-trending"
                  )[0].scrollLeft += 500)
                }>
                <FiArrowRight />
              </span>
            </div>
          </div>
          <div ref={productref} className="product-trending">
            {products.map(
              (item, index) =>
                item && <Productbox item={item} key={item.p_id} />
            )}
          </div>
        </div>
        <div className="product-contents">
          <h4>Latest</h4>
          <div className="product-trending">
            {products.map(
              (item, index) =>
                item && <Productbox item={item} key={item.p_id} />
            )}
          </div>
        </div>
      </motion.div>{" "}
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
