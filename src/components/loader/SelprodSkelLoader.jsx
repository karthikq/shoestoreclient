/** @format */

import { Skeleton } from "@mui/material";
import React from "react";

const SelprodSkelLoader = () => {
  return (
    <div className="product_skeleton">
      <div className="selproduct-contents selproduct_skl-contents">
        <Skeleton variant="rectangular" className="skl_selproduct-img" />
        <div className="selproduct-details">
          <Skeleton variant="text" width={"80%"} className="selproduct-h2" />
          <Skeleton variant="text" height={"2rem"} className="p_desp-div" />
          <Skeleton
            variant="text"
            width={"5rem"}
            height={"2rem"}
            className="selproduct-price"
          />
          <div className="selproduct-actions">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
          </div>
          <div className="sel-product-tags">
            <Skeleton variant="text" width={"2rem"} />
            <Skeleton variant="text" width={"2rem"} />
            <Skeleton variant="text" width={"2rem"} />
          </div>
          <div className="selproduct-usage">
            <Skeleton variant="rectangular" width={"100%"} height={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelprodSkelLoader;
