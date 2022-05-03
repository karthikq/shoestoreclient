/** @format */

import React from "react";
import { motion } from "framer-motion";
const OptionItem = ({ checkExists, selOptions, value, id }) => {
  return (
    <motion.div
      className="options-btndiv"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: id / 8 }}
      onClick={() => checkExists(value)}>
      <button
        type="button"
        className={
          selOptions.includes(value.toLowerCase().replace(/\s/g, ""))
            ? "label-active optionsitem-btn"
            : "optionsitem-btn"
        }>
        {value}
      </button>
    </motion.div>
  );
};

export default OptionItem;
