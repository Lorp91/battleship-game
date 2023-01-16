import React, { useContext, useEffect, useState } from "react";
import { GameStateContext } from "../../App";
import { Grid } from "../grid/Grid";
import { GameContext } from "../../models/types";
import "./gamePlaying.scss";

export const GamePlaying = () => {
  const { game } = useContext(GameStateContext) as GameContext;
  const [gameover, setGameover] = useState<boolean>(false);
  const [winner, setWinner] = useState<"Sie" | "Der Feind">("Sie");

  useEffect(() => {
    console.log("effect");
    let res = true;
    for (let ship of game.playerShips) {
      if (ship.body.length) {
        res = false;
        break;
      }
    }
    if (res) {
      setWinner((prev) => "Der Feind");
      setGameover((prev) => res);
    }

    for (let ship of game.enemyShips) {
      if (ship.body.length) {
        res = false;
        break;
      }
    }
    if (res) {
      setGameover((prev) => res);
      return;
    }
  }, [game]);

  return (
    <div className="playfield">
      <div id="player-screen" className="screen">
        <h2>Ihre Flotte</h2>
        <Grid board={game.playerBoard} isEnemy={false} />
        <div className="fleet">
          {game.playerShips.map((ship) => (
            <p
              key={crypto.randomUUID()}
              style={{
                background: ship.body.length ? "lightgreen" : "lightcoral",
              }}
            >
              {ship.name}
            </p>
          ))}
        </div>
      </div>
      <div id="enemy-screen" className="screen">
        <h2>Der Feind!</h2>
        <Grid board={game.enemyBoard} isEnemy={true} />
        <div className="fleet">
          {game.enemyShips.map((ship) => (
            <p
              key={crypto.randomUUID()}
              style={{
                background: ship.body.length ? "lightgreen" : "lightcoral",
              }}
            >
              {ship.name}
            </p>
          ))}
        </div>
      </div>
      {gameover && (
        <div id="result-container">
          <h3>
            {winner === "Sie"
              ? `${winner} haben Gesiegt!`
              : `${winner} hat Sie niedergestreckt!`}
          </h3>
          {/* <button onClick={() => setGame(initialState)}>neustart</button> */}
        </div>
      )}
    </div>
  );
};
