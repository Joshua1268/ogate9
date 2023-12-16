import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-vertical-timeline-component/style.min.css";
import "./index.css";
import "./assets/fonts/font.css";
import AppRoutes from "./router/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>
);
