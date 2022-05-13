/** @format */

import React from "react";
import Lottie from "../../hooks/Lottie";
import NoItems from "../errors/NoItems";
import loader1 from "./1.json";
import loader2 from "./2.json";
import loader3 from "./8.json";
import loader4 from "./4.json";
import loader5 from "./5.json";

import loader7 from "./7.json";

const EmptyLoader = ({ loader, itemClass, state }) => {
  Lottie(loader3, "empty_item");

  return (
    <div className="empty-container">
      <div id="empty_item"></div>
      <NoItems text="Add now" path="/categ/options" />
    </div>
  );
};

export default EmptyLoader;
