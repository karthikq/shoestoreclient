/** @format */

import React, { useRef } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Productbox from "../../components/Product/Productbox";

const ProductsList = ({ products, details, state }) => {
  const product = useRef();

  const productitems = (value) => {
    var sortedProduct = products;
    if (value === "popular") {
      //       sortedProduct = sortedProduct.filter((data) => {
      //         return data.totalRating >= 3 ? data : "";
      //       });
      console.log("S1");
      sortedProduct.sort((a, b) => (a.totalRating - b.totalRating ? 1 : -1));
    }
    if (value === "latest") {
      console.log("S2");
      //       console.log(sortedProduct.sort((a, b) => (a.date - b.date ? 1 : -1)));
      sortedProduct.sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1));
    }

    if (value === "viewed") {
      sortedProduct.sort((a, b) => (a.viewCount - b.viewCount ? 1 : -1));
      //        sortedProduct.sort
      //       sortedProduct.sort((a, b) => (a?.totalRating - b?.totalRating ? 1 : -1));
    }
    return sortedProduct.map((item, index) => (
      <Productbox item={item} key={item.p_id} />
    ));
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
        {productitems(state)}
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
