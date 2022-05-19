/** @format */

import { Skeleton } from "@mui/material";
import React from "react";

const LabelSkl = () => {
  return (
    <Skeleton
      variant="text"
      height={"2rem"}
      width={"5rem"}
      style={{ alignSelf: "flex-start" }}
      sx={{ bgcolor: "grey.900" }}
    />
  );
};

export default LabelSkl;
