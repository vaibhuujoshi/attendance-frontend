import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import HomePage from "./HomePage";
import Login from "./pages/Login";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <App/>
  </>
);
