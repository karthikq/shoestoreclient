/** @format */

import React, { useEffect, useState } from "react";
import "./product.styles.scss";
import Productbox from "../../components/Product/Productbox";
import { motion } from "framer-motion";

import { connect } from "react-redux";
import { fetchselProduct } from "../../components/actions";
import ProductsList from "./ProductsList";
import { AiOutlineFire } from "react-icons/ai";
import img1 from "./1.gif";
import allproducts from "../../ProdCat.json";
import { useParams } from "react-router-dom";
import NoItems from "../../components/errors/NoItems";

const Products = ({ fetchselProduct, products }) => {
  const [itemCateg, setItemCateg] = useState();
  const [options, setOptions] = useState({});

  useEffect(() => {
    fetchselProduct();
    const categ1 = sessionStorage.getItem("data");
    const categ = categ1
      ? categ1.charAt(0).toUpperCase().toUpperCase() + categ1.slice(1)
      : "Shoes";
    const res = allproducts.find((item) => {
      return item.type === categ && item;
    });

    setOptions(res);

    const list = res?.options.some(
      (el) => el.value === sessionStorage.getItem("itemCateg").split(",")[0]
    );
    if (list) {
      setItemCateg(sessionStorage.getItem("itemCateg").split(",")[0]);
    } else {
      setItemCateg(res?.options[0].value);
    }
    console.log(list);
  }, []);

  return (
    <React.Fragment>
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
      </div>{" "}
      <div className="product-items-container">
        <div className="product-items_header">
          <h3>All Products</h3>
          <div className="product-items_dropdown">
            <span className="product-items_span">Choose a category</span>
            <select
              className="product-items_select"
              name="itemCateg"
              value={itemCateg}
              onChange={(e) => {
                setItemCateg(e.target.value);
                sessionStorage.setItem("itemCateg", e.target.value);
              }}>
              {options?.options?.map((item) => (
                <option value={item.value} key={item.label}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>{" "}
        <motion.div className="product-items_list">
          {products?.map(
            (item) =>
              item?.keywords?.includes(itemCateg) && (
                <Productbox item={item} key={item._id} />
              )
          )}
        </motion.div>{" "}
        {products?.some((item) =>
          item?.keywords?.some((el) => el === itemCateg)
        ) ? (
          ""
        ) : (
          <div>
            <NoItems state={true} text="" path={""} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
const mapStatetoProps = (state) => {
  return {
    products: state.Products,
  };
};
export default connect(mapStatetoProps, { fetchselProduct })(Products);
