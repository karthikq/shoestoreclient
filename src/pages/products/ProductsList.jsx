/** @format */

import React, { useRef } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Productbox from "../../components/Product/Productbox";

const ProductsList = ({ products, details, state }) => {
  const product = useRef();

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
        {products.map(
          (item, index) => item && <Productbox item={item} key={item.p_id} />
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
