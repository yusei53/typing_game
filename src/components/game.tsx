import React, { useState, useEffect } from "react";
import correctSound from "../audio/audio_correct.mp3";
import incorrectSound from "../audio/audio_wrong.mp3";
import typingSound from "../audio/audio_typing-sound.mp3";

export const Game = (props: { title: string }) => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const words = [
    { japanese: "メロン", english: "meron" },
    { japanese: "リンゴ", english: "apple" },
  ];

  const checkUserInput = () => {
    if (userInput.toLowerCase() === currentWord.english.toLowerCase()) {
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

  const handleCharacterInput = (char: string) => {
    const currentCharIndex = userInput.length;
    const currentChar = currentWord.english[currentCharIndex];

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
    setTimeLeft(60); // 制限時間を初期化

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 0.5);
      playSound(timerSound);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      setTimerRunning(false);
      setTimeLeft(0);
      endGame();
    }
  };

  const endGame = () => {
    setTimerRunning(false);
    if (timeLeft <= 0) {
      // 制限時間が0秒になった場合の処理を追加する
      // 例: リザルトを表示する、ゲームをリセットする、など
    }
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const title = props.title;

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="w-3/4 h-4/5 text-center p-8 rounded shadow-lg justify-center text-white">
        <p className="text-4xl font-bold mb-4">{title}</p>
        <p className="text-2xl mb-2 text-white">スコア: {score}</p>
        <p className="text-2xl mb-2 text-white">残り時間: {timeLeft}秒</p>{" "}
        {/* Display remaining time */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold tracking-wider text-white">
            {currentWord && currentWord.japanese && (
              <span className="text-red-500">{currentWord.japanese}</span>
            )}
            {currentWord && currentWord.english && (
              <span>
                {currentWord.english.split("").map((char, index) => (
                  <span
                    key={index}
                    className={
                      index < userInput.length
                        ? userInput[index].toLowerCase() ===
                          currentWord.english[index].toLowerCase()
                          ? "text-red-500"
                          : "text-blue-500"
                        : ""
                    }
                  >
                    {char}
                  </span>
                ))}
              </span>
            )}
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
            className=" mt-20 bg-blue-200 border border-black p-2 rounded w-64 text-black"
          />
        </div>
      </div>
    </div>
  );
};
