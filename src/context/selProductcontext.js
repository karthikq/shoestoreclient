/** @format */

import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ProductContextobj = createContext();

const SelProductContext = ({ children }) => {
  const [selproductState, setselproductState] = useState(false);

  return (
    <ProductContextobj.Provider
      value={{
        state: selproductState,
        setState: setselproductState,
      }}>
      {children}
    </ProductContextobj.Provider>
  );
};

export default SelProductContext;
