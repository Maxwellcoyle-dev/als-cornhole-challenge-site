"use client";

import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapComponent = () => {
  const position = {
    lat: 37.7749,
    lng: -122.4194,
  };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "30rem", width: "40rem" }}>
        <Map
          zoom={9}
          center={position}
          mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <div>
                <h1>Event Location</h1>
                <p>City: San Francisco</p>
                <p>State: California</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
