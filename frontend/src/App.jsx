import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Interview from "./pages/Interview";
import Layout from "./layout";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs/>}/>
        <Route path="interview/behavioral" element={<Interview />} />

      </Route>
    </Routes>
  );
}

export default App;
