/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Mapcomp from "./Mapcomp";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation, useGeolocation } from "react-use";
import toast from "react-hot-toast";

export const Gmaps = () => {
  const [center, setCenter] = useState({
    lat: "",
    lng: "",
  });
  const containerStyle = {
    width: "100%",
    height: "200px",
  };

 
  //   const { latitude, longitude } = useGeolocation();
  //   useEffect(() => {
  //     if (latitude && longitude) {
  //       setCenter({
  //         lat: latitude,
  //         lng: longitude,
  //       });
  //     } else {
  //       toast.error("Please enable location");
  //     }
  //   }, [latitude, longitude]);

  return (
    <div style={{ width: "100%", margin: "1.5rem 0" }}>
      <LoadScript >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker
            position={center}
            draggable
            onDraggableChanged={(position) => console.log(position)}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
