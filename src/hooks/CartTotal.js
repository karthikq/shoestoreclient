/** @format */

import React, { useEffect, useState } from "react";
import { getCurrency } from "../components/getCurrency";

const CartTotal = (userData) => {
  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    let price = 0;

    userData?.cart?.items?.map(
      ({ product, quantity }) =>
        (price += product?.price ? product?.price * quantity : 0)
    );
    setCartTotal(getCurrency(price));
  }, [userData]);

  return cartTotal;
};

export default CartTotal;
