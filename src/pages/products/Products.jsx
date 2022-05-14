/** @format */

import React, { useContext, useEffect, useState } from "react";
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
import Selproduct from "../selProduct/Selproduct";
import { ProductContextobj } from "../../context/selProductcontext";

const Products = ({ fetchselProduct, products }) => {
  const [p_item, setp_item] = useState("");
  useEffect(() => {
    fetchselProduct();
  }, []);
  const { state } = useContext(ProductContextobj);

  return (
    <>
      {/* <Selproduct state={state} /> */}
      <motion.div className="product-container">
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
        {/* <div
          className="product_video"
          style={{
            background: `url(${p_item?.p_img[0]}) no-repeat center`,
            backgroundAttachment: "fixed",
          }}>
          <video autoPlay loop className="">
            <source src="../../videos/4.mp4" />
          </video>  
        </div> */}
        {/* <div className="product-contents">
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
        </div> */}
        <div className="product-items-container">
          <div className="product-items_header">
            <h3>category name</h3>
            <div className="product-items_dropdown">
              <select name="" id="">
                <option value="">casul</option>
                <option value="">v</option>
                <option value="">casul</option>
                <option value="">casul</option>
              </select>
            </div>
          </div>
          <div className="product-items_list">
            {products?.map(
              (item) => item && <Productbox item={item} key={item._id} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
const mapStatetoProps = (state) => {
  return {
    products: state.Products,
  };
};
export default connect(mapStatetoProps, { fetchselProduct })(Products);
