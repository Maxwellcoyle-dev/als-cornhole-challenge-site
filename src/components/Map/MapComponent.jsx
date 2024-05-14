"use client";

import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import { IoOpenOutline } from "react-icons/io5";

import styles from "./MapComponent.module.css";

const MapComponent = ({ googleMapsLink, locationParams }) => {
  const [viewState, setViewState] = useState(null);

  const handleMapClick = () => {
    window.open(googleMapsLink, "_blank"); // Open in a new tab
  };

  useEffect(() => {
    console.log("locationParams: ", locationParams);
    if (locationParams) {
      const updatedViewState = {
        lat: parseFloat(locationParams.lat), // Convert string to float
        lng: parseFloat(locationParams.lng), // Convert string to float
      };
      setViewState(updatedViewState);
    }
  }, [locationParams]);

  const mapOptions = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    scaleControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div
        style={{
          height: "100%",
          width: "100%",
          minHeight: "300px",
        }}
        onClick={handleMapClick}
        className={styles.mapDiv}
      >
        <div className={styles.textDiv}>
          <p>Click to open in Google Maps</p> <IoOpenOutline />
        </div>
        <Map
          zoom={9}
          options={mapOptions}
          center={viewState}
          mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
        >
          <AdvancedMarker position={viewState}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
