import React, { useContext } from "react";
import { GameStateContext } from "../../App";
import { ImArrowUp } from "react-icons/im";
import { Grid } from "../grid/Grid";
import { GameContext } from "../../models/types";
import "./gamePlaying.scss";

export const GamePlaying = () => {
  const { game } = useContext(GameStateContext) as GameContext;

  return (
    <div className="playfield">
      <div id="player-screen" className="screen">
        <Grid board={game.playerBoard} isEnemy={false} />
        {/* <div className="player-ships">
          <div>träger</div>
          <div>schlachtschiff</div>
          <div>kreuzer</div>
          <div>terstörer</div>
        </div> */}
      </div>
      <div id="enemy-screen" className="screen">
        <Grid board={game.enemyBoard} isEnemy={false} />
      </div>
      {/* <div id="rotation-container">
        <ImArrowUp
          className="activePlayerIndicator"
          style={{
            transform: `rotate(${game.playerActive ? 0 : 180}deg)`,
          }}
        />
      </div> */}
    </div>
  );
};
