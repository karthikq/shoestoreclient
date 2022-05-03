/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./model.styles.scss";
import { motion } from "framer-motion";

const Model = ({ state, setState, cb, text }) => {
  const Item = ({ state, setState }) => {
    return (
      state && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="model-container">
            <div className="modal-contents">
              <p className="model-p">{text}</p>
              <div className="model-btns">
                <span
                  className="model-span_1"
                  onClick={() => {
                    cb(true);
                    setState(false);
                  }}>
                  Yes
                </span>
                <span
                  className="model-span_1 span_2"
                  onClick={() => setState(false)}>
                  No
                </span>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )
    );
  };
  // <Item state={state} setState={setState} />
  return ReactDOM.createPortal(
    <Item state={state} setState={setState} />,
    document.getElementById("model")
  );
};

export default Model;
