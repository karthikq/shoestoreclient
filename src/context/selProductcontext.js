/** @format */

import React, { createContext, useState } from "react";

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
