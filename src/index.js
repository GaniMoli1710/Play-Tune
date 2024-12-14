import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter> {/* BrowserRouter should wrap the entire app */}
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
