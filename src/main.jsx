import React from "react";
import ReactDOM from "react-dom/client";
import NexusApp from "./NexusApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NexusApp demoMode={true} />
  </React.StrictMode>
);
