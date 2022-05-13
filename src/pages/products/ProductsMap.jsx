/** @format */

import React from "react";
import Productbox from "../../components/Product/Productbox";

const ProductsMap = ({ products }) => {
  return (
    <React.Fragment>
      {products.map(
        (item, index) => item && <Productbox item={item} key={item.p_id} />
      )}
    </React.Fragment>
  );
};

export default ProductsMap;
