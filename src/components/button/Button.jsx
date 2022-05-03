/** @format */

import React from "react";
import SimpleLoader from "../loader/SimpleLoader";
import "./btn.styles.scss";

const Button = ({ state, name }) => {
  return (
    <React.Fragment>
      <SimpleLoader>
        {state && <div className="btn-loading-div"></div>}{" "}
        <span style={{ position: "relative", bottom: "0.1rem" }}>{name}</span>
      </SimpleLoader>
    </React.Fragment>
  );
};

export default Button;
