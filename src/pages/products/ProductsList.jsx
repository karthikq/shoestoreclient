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
    if (value === "new") {
      sortedProduct.sort((a, b) => {
        return new Date(b.sortDate) - new Date(a.sortDate);
      });
      console.log(sortedProduct, value);
    }
    if (value === "viewed") {
      sortedProduct.sort((a, b) => {
        return b.viewCount - a.viewCount;
      });
    }
    return <ProductsMap products={sortedProduct} />;
  };
  return (
    <React.Fragment>
      <div className="product-header">
        <h4 className="product-h4">
          {details.text} {details.icon}
        </h4>
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
