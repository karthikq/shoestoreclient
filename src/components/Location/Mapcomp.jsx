/** @format */

import React, { useEffect, useRef } from "react";

const Mapcomp = ({ center, zoom }) => {
  const ref = useRef();
  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });
  return <div ref={ref} style={{ width: "500px", height: 200 }} id="map"></div>;
};

export default Mapcomp;
