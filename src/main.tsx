import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Editor } from "./pages/editor/Editor";
import "./index.css";
import { BetaOverlay } from "./shared/BetaOverlay";
import { DarkModeOverlay } from "./shared/DarkModeOverlay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Editor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BetaOverlay />
    <DarkModeOverlay />
    <RouterProvider router={router} />
  </React.StrictMode>
);
