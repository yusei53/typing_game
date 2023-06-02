import React, { useState, useEffect } from "react";
import correctSound from "../audio/audio_correct.mp3";
import incorrectSound from "../audio/audio_wrong.mp3";
import typingSound from "../audio/audio_typing-sound.mp3";

export const Game = (props: { words: any; title: string }) => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const words = props.words;

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

  const handleCharacterInput = (char) => {
    const currentCharIndex = userInput.length;
    const currentChar = currentWord[currentCharIndex];

    if (char.toLowerCase() === currentChar.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      playSound(typingSound);
    } else {
      setScore((prevScore) => prevScore - 1);
      playSound(incorrectSound);
    }
  };

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

  const title = props.title;

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg justify-center">
        <p className="text-4xl font-bold mb-4">{title}</p>
        <p className="text-2xl mb-2">スコア: {score}</p>

        <div className="flex flex-col items-center space-y-4 ">
          <div className="text-6xl font-bold tracking-wider">
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
          </div>
        </div>

        <div className="">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                checkUserInput();
              } else {
                handleCharacterInput(e.key);
              }
            }}
            autoComplete="off"
            className=" mt-20 bg-blue-200 border border-black p-2 rounded w-64"
          />
        </div>
      </div>
    </div>
  );
};
