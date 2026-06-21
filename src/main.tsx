// React is the core library that lets us build UI components
import React from "react";
// ReactDOM is responsible for rendering those React components into the actual browser DOM (HTML)
import ReactDOM from "react-dom/client";

// Import our main App component which contains the entire application routing and layout
import App from "./App";
// Import global CSS styles (like fonts, colors, and reset styles)
import "./globals.css";

// This is the true entry point of the React application.
// It finds the HTML element with id="root" (inside index.html) and injects our React <App /> inside it.
ReactDOM.createRoot(document.getElementById("root")!).render(
  // React.StrictMode is a development tool that highlights potential problems by rendering components twice in dev mode.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
