import React, { useState, useEffect } from "react";
import correctSound from "../audio/audio_correct.mp3";
import incorrectSound from "../audio/audio_wrong.mp3";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const words = ["apple", "banana", "orange", "grape", "watermelon"];

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkUserInput = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore((prevScore) => prevScore + 10);
      setUserInput("");
      generateNewWord();
      playSound(correctSound);
    } else {
      playSound(incorrectSound);
    }
  };

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  useEffect(() => {
    generateNewWord();
    startTimer();
  }, []);

  useEffect(() => {
    if (userInput.length === 0) return;
  }, [userInput]);

  useEffect(() => {
    if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimerRunning(true);
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      playSound(timerSound);

      if (timeLeft === 1) {
        clearInterval(timerInterval);
        setTimerRunning(false);
        endGame();
      }
    }, 1000);
  };

  const endGame = () => {
    setTimerRunning(false);
    // ここでゲームの終了処理を追加する（例: 結果画面を表示する、リセットするなど）
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg">
        <p className="text-4xl font-bold mb-4">タイピングゲーム</p>
        <p className="text-2xl mb-4">スコア: {score}</p>

        <div className="text-6xl font-bold mb-8 tracking-wider">
          {currentWord.split("").map((char, index) => (
            <span
              key={index}
              className={
                index < userInput.length
                  ? userInput[index].toLowerCase() ===
                    currentWord[index].toLowerCase()
                    ? "text-red-500"
                    : "text-blue-500"
                  : ""
              }
            >
              {char}
            </span>
          ))}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={checkUserInput}
            autoComplete="off"
            className="bg-blue-200 border border-black p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};
