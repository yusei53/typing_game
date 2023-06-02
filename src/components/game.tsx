import React, { useState, useEffect } from "react";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");

  const words = ["apple", "banana", "orange", "grape", "watermelon"];

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

    const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
    const wordElement = document.getElementById("current-word");

    if (isCorrect) {
      const coloredWord = currentWord.split("").map((char, index) =>
        index < userInput.length ? (
          <span key={index} className="text-green-500">
            {char}
          </span>
        ) : (
          <span key={index}>{char}</span>
        )
      );

      wordElement.innerHTML = coloredWord;
    } else {
      wordElement.textContent = currentWord;
    }
  }, [userInput, currentWord]);

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg ">
        <p className="text-4xl font-bold mb-4">python知識</p>
        <p className="text-2xl mb-8">スコア: {score}</p>
        <p id="current-word" className="text-6xl font-bold mb-8 tracking-wider">
          {currentWord}
        </p>
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
