import React, { useContext } from "react";
import { GameStateContext } from "../../App";
import { GameContext } from "../../models/types";

export const GameSetup = () => {
  const { setGame } = useContext(GameStateContext) as GameContext;

  return (
    <div>
      <button
        onClick={() => setGame((prev) => ({ ...prev, gameStage: "playing" }))}
      >
        zum game
      </button>
    </div>
  );
};
