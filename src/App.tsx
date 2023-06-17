import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./components/Game";
import { Home } from "./components/Home";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game title="python基礎" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
