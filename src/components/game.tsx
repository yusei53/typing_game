import React, { useState, useEffect } from "react";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");

  const words = ["apple", "banana", "orange", "grape", "watermelon"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkUserInput();
    }
  };

  const checkUserInput = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1);
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

  return (
    <div>
      <p>スコア: {score}</p>
      <p>単語: {currentWord}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="bg-blue-200 border border-black"
      />
    </div>
  );
};
