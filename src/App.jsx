import React from "react";
export const MapContext = React.createContext();
import "./App.css";

import { MapContainer } from "./MapContainer";

function App() {
  return (
    <>
      <div className="map-container">
        <MapContainer MapContext={MapContext} />
      </div>
    </>
  );
}

export default App;
