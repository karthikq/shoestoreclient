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
  const [itemCateg, setItemCateg] = useState("casual");

  useEffect(() => {
    fetchselProduct();
  }, []);
  const { state } = useContext(ProductContextobj);
  const options = [
    { value: "casual", label: "Casual", color: "#00B8D9" },
    { value: "running", label: "Running", color: "#0052CC" },
    { value: "sports", label: "Sports", color: "#5243AA" },
    {
      value: "boatshoes",
      label: "Boat shoes",
      color: "#FF5630",
      isFixed: true,
    },
    { value: "flipflop", label: "Flip flop", color: "#FF8B00" },
    { value: "loafers", label: "Loafers", color: "#FFC400" },
    { value: "boots", label: "Boots", color: "#36B37E" },
    { value: "formalshoes", label: "Formal shoes", color: "#00875A" },
    { value: "sandals", label: "Sandals", color: "#253858" },
  ];
  console.log(itemCateg);

  return (
    <>
      {/* <Selproduct state={state} /> */}
      <div className="product-container">
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
            <h3>Products</h3>
            <div className="product-items_dropdown">
              <select
                name="itemCateg"
                value={itemCateg}
                onChange={(e) => setItemCateg(e.target.value)}>
                {options.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>{" "}
          <motion.div layout="position" className="product-items_list">
            <AnimatePresence>
              {products?.map(
                (item) =>
                  item?.keywords?.includes(itemCateg) && (
                    <Productbox item={item} key={item._id} />
                  )
              )}
            </AnimatePresence>
          </motion.div>{" "}
        </div>
      </div>
    </>
  );
};
const mapStatetoProps = (state) => {
  return {
    products: state.Products,
  };
};
export default connect(mapStatetoProps, { fetchselProduct })(Products);
