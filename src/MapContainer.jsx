import React, { useState } from "react";

import { Map } from "./Map";

export const MapContainer = ({ MapContext }) => {
  // set initial map zoom and position
  const [lng, setLng] = useState(-75.469);
  const [lat, setLat] = useState(39.063);
  const [zoom, setZoom] = useState(7.5);

  return (
    <MapContext.Provider value={{}}>
      <Map lng={lng} lat={lat} zoom={zoom} />
    </MapContext.Provider>
  );
};
