import React from "react";
import { Game } from "./components/Game";

import "./index.css";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">タイピングゲーム</h1>
      <Game />
    </div>
  );
}

export default App;
