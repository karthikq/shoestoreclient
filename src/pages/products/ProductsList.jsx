/** @format */

import React, { useRef } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Productbox from "../../components/Product/Productbox";
import ProductsMap from "./ProductsMap";

const ProductsList = ({ products, details, value }) => {
  const product = useRef();

  const sortProducts = () => {
    let sortedProduct = products;
    if (value === "popular") {
      //       sortedProduct = sortedProduct.filter((data) => {
      //         return data.totalRating >= 3 ? data : "";
      //       });

      sortedProduct.sort((a, b) => {
        return b.totalRating - a.totalRating;
      });
    }
    return <ProductsMap products={sortedProduct} />;
  };
  return (
    <React.Fragment>
      <div className="product-header">
        <div className="product-header-left">
          <h4 className="product-h4">
            {details.text.split(" ")[0]}{" "}
            <span>{details.text.split(" ")[1]}</span>
          </h4>
          {/* <img className="product-header_img" src={details.img} alt="gif" /> */}
        </div>
        <div className="product-arrow_icons">
          <span
            className="product-arrow_icon"
            onClick={() => (product.current.scrollLeft -= 500)}>
            <FiArrowLeft />
          </span>
          <span
            className="product-arrow_icon"
            onClick={() => (product.current.scrollLeft += 500)}>
            <FiArrowRight />
          </span>
        </div>
      </div>
      <div ref={product} className="product-trending">
        {sortProducts()}
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
