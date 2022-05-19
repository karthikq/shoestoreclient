/** @format */

import { Skeleton } from "@mui/material";
import React from "react";
import Inputskl from "./Inputskl";
import LabelSkl from "./labelSkl";

const FormLoader = () => {
  return (
    <div className="create-p_form">
      <div className="create-p_form-contents">
        <LabelSkl />
        <Inputskl />
        <LabelSkl />
        <Inputskl /> <LabelSkl />
        <Inputskl /> <LabelSkl />
        <Inputskl />
      </div>
    </div>
  );
};

export default FormLoader;
