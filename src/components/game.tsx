import React, { useState, useEffect } from "react";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");

  const words = ["りんご", "ばなな", "オレンジ", "ぶどう", "すいか"];

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkUserInput = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore((prevScore) => prevScore + 10);
      setUserInput("");
      generateNewWord();
    }
  };

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  useEffect(() => {
    if (userInput.length === 0) return;
  }, [userInput]);

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg bg-white">
        <p className="text-4xl font-bold mb-4">タイピングゲーム</p>
        <p className="text-2xl mb-8">スコア: {score}</p>
        <div className="text-6xl font-bold mb-8 tracking-wider">
          {currentWord.split("").map((char, index) => (
            <span
              key={index}
              className={index < userInput.length ? "text-green-500" : ""}
            >
              {char}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={checkUserInput}
          className="bg-blue-200 border border-black p-2 rounded"
        />
      </div>
    </div>
  );
};
