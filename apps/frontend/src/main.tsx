import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FateClientProvider } from "./tprc/fate-client.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FateClientProvider />
  </StrictMode>,
);
