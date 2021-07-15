import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.css";
import { AppProvider } from "./context";
import Routes from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
