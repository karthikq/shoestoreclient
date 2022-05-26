/** @format */

import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const ReactConfitte = ({ state, setState }) => {
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (state) {
      const item = document.querySelector(".confettie");
      setTimeout(() => {
        item.style.opacity = 0;
      }, 4000);
    }
  }, [state]);

  return (
    <React.Fragment>
      {state && (
        <div className="react_confetti">
          <Confetti width={width} height={height} className="confettie" />
        </div>
      )}
    </React.Fragment>
  );
};

export default ReactConfitte;
