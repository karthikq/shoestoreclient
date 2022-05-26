/** @format */

import   { useEffect, useState } from "react";

const CartTotal = (userData) => {
  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    let price = 0;

    userData?.cart?.items?.map(
      ({ product, quantity }) =>
        (price += product?.price ? product?.price * quantity : 0)
    );
    setCartTotal(price);
  }, [userData]);

  return cartTotal;
};

export default CartTotal;
