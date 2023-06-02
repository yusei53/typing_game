import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-custom-background">
        <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg">
          <h1 className="text-4xl font-bold mb-6">タイピングゲーム</h1>
          <Link to="/game">
            <button className="px-8 py-3 text-xl font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              クリック
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
