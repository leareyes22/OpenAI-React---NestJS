import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactGPT } from "./ReactGPT";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactGPT />
  </StrictMode>
);
