import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Interview from "./pages/Interview";
import Layout from "./layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="interview" element={<Interview />} />
      </Route>
    </Routes>
  );
}

export default App;
