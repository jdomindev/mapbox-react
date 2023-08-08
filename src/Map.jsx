// Mapbox import
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import "mapboxgl-legend/dist/style.css";
import { MapContext } from "./App";
import "./Map.css";

import { useRef, useEffect, useContext } from "react";
// import ReactDOM from "react-dom/client";
import { useUpdateEffect } from "react-use";

// custom home button
import HomeControl, { homeControlFunctionality } from "./utils/HomeControl";

// add Mapbox API key via env file
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export const Map = ({ lng, lat, zoom }) => {
  const mapDiv = useRef(null);
  const map = useRef(null);

  // variables relating to map
  const {} = useContext(MapContext);

  // Adds map layers
  const addMapLayers = () => {};

  // Initial loading of data, setting global settings, adding nav controls
  useEffect(() => {
    if (map.current) return;

    // Create initial map background
    map.current = new mapboxgl.Map({
      container: mapDiv.current,
      // Create new style map here: https://studio.mapbox.com/
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 7,
      projection: "globe",
    });

    map.current.on("load", () => {
      // Render Navigation controls and legend
      map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
      map.current.addControl(new mapboxgl.GeolocateControl(), "bottom-left");
      // Custom button to return to intial zoom and position
      map.current.addControl(new HomeControl(), "bottom-left");
      // Home button functionality
      homeControlFunctionality(map.current, lng, lat, zoom);

      // Add data sources here
      // map.current.addSource("data-source", {
      //   type: "geojson",
      //   data: mapData,
      //   generateId: true,
      // });

      // adds default/initial map layers
      addMapLayers();
    });
  }, []);

  const update = () => {
    // If layer exists delete layer
    // if (map.current.getLayer()) {
    //   map.current.removeLayer();
    // }

    // Re-adds default/initial map layers
    addMapLayers();
  };

  // run an effect (update function) only on updates of dependency array
  useUpdateEffect(update, []);

  return <div ref={mapDiv} id="mapDiv"></div>;
};
