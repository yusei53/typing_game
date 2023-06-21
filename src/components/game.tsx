import { useState } from "react";

export const Game = (props: { title: string }) => {
  const title = props.title;

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userInput, setUserInput] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-custom-background">
      <div className="h-4/5 p-8 font-bold text-white justify-center text-center">
        <p className="text-4xl mb-6">{title}</p>
        <p className="text-3xl mb-2">スコア：{score}</p>
        <p className="text-3xl">残り時間：{timeLeft}</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="text-black mt-20 bg-blue-200 p-2 rounded w-64"
        />
      </div>
    </div>
  );
};
