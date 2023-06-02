import React from "react";
import { Game } from "./components/Game";

import "./index.css";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 bg-custom-background">
      <div className="text-center p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-6">タイピングゲーム</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;
