import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";

// Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Behavioral from "./pages/Behavioral";
import Fin from "./pages/Fin"
import Pro from "./pages/Pro"
import Tech from './pages/Tech'
import Sys from "./pages/Sys";
import Dsa from "./pages/Dsa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />



        <Route path="interview/behavioral" element={<Behavioral />} />
        <Route path="interview/dsa" element={<Dsa/>} />
        <Route path="interview/final" element={<Fin/>} />
        <Route path="interview/project" element={<Pro />} />
        <Route path="interview/technical" element={<Tech />} />
        <Route path="interview/system" element={<Sys />} />
      </Route>
    </Routes>
  );
}

export default App;
