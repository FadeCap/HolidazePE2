// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import RoutesComponent from "./Components/RoutesComponent";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoutesComponent />
  </React.StrictMode>
);
