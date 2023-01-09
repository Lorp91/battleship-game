import React, { useContext } from "react";
import { GameLogicContext } from "./App";

export const GameSetup = () => {
  const { refreshState } = useContext(GameLogicContext);

  return (
    <div>
      GameSetup <button onClick={() => {}}>zum game</button>
    </div>
  );
};
