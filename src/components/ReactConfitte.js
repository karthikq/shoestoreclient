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
      }, 3000);
    }
  }, [state]);

  return (
    <React.Fragment>
      {state && (
        <Confetti width={width} height={height} className="confettie" />
      )}
    </React.Fragment>
  );
};

export default ReactConfitte;
