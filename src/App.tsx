import { useState } from "react";
import "./app.scss";
import { Grid } from "./Grid";
import { Game } from "./GameLogic";

const App: React.FunctionComponent<JSX.Element> = () => {
  const gameLogic = Game.getInstance();
  const [game, setGame] = useState(gameLogic.getState());

  const switchHandler = () => {
    gameLogic.switchActivePlayer();
    setGame(gameLogic.getState());
  };

  return (
    <div className="App">
      <div
        className="playfield"
        style={{ transform: `translateY(${game.playerActive ? -100 : 0}vh)` }}
      >
        <div id="enemy-screen" className="screen">
          <Grid board={game.enemyBoard} isEnemy={true} />
          <button onClick={switchHandler}>wechseln</button>
        </div>
        <div id="player-screen" className="screen">
          <Grid board={game.playerBoard} isEnemy={false} />
          <button onClick={switchHandler}>wechseln</button>
        </div>
      </div>
    </div>
  );
};

export default App;
