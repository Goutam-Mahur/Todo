import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
