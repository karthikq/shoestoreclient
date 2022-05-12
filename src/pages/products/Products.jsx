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
import { MdOutlineNewReleases } from "react-icons/md";

const Products = ({ fetchselProduct, products }) => {
  useEffect(() => {
    fetchselProduct();
  }, []);

  const productitems = (value) => {
    var sortedProduct = products;
    if (value === "popular") {
      //       sortedProduct = sortedProduct.filter((data) => {
      //         return data.totalRating >= 3 ? data : "";
      //       });

      sortedProduct.sort((a, b) => (a.totalRating - b.totalRating ? 1 : -1));
    }
    if (value === "latest") {
      //       console.log(sortedProduct.sort((a, b) => (a.date - b.date ? 1 : -1)));
      sortedProduct.sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1));
    }

    if (value === "viewed") {
      sortedProduct.sort((a, b) => (a.viewCount - b.viewCount ? 1 : -1));
      //        sortedProduct.sort
      //       sortedProduct.sort((a, b) => (a?.totalRating - b?.totalRating ? 1 : -1));
    }

    return sortedProduct;
  };

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
            products={productitems("popular")}
            details={{
              text: "Most popular",
              icon: <AiOutlineFire className="product-header_icon" />,
            }}
            state="popular"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={productitems("latest")}
            details={{
              text: "Latest",
              icon: <MdOutlineNewReleases className="product-header_icon" />,
            }}
            state="latest"
          />
        </div>
        <div className="product-contents">
          <ProductsList
            products={productitems("viewed")}
            details={{
              text: "Most viewed",
              icon: <AiOutlineEye className="product-header_icon" />,
            }}
            state="viewed"
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
