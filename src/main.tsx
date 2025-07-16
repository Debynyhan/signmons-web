// src/main.tsx (or index.tsx)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css"; // Import your global styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
