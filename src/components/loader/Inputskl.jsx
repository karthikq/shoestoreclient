/** @format */

import { Skeleton } from "@mui/material";
import React from "react";

const Inputskl = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={"3rem"}
      width={"100%"}
      animation="wave"
      sx={{ bgcolor: "grey.900", marginBottom: "1.4rem" }}
    />
  );
};

export default Inputskl;
