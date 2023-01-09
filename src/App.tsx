import { createContext, useState } from "react";
import "./app.scss";
import { Grid } from "./Grid";
import { Game } from "./GameLogic";
import { GameContext, GameState } from "./models/types";
import { ImArrowUp } from "react-icons/im";
import { GameSetup } from "./GameSetup";

const gameLogic = Game.getInstance();
export const GameLogicContext = createContext<GameContext>({
  game: gameLogic.getState(),
  refreshState: () => {},
});

const App: React.FunctionComponent<JSX.Element> = () => {
  const [game, setGame] = useState<GameState>(gameLogic.getState());

  const refreshState = () => {
    setGame(gameLogic.getState());
  };

  const switchHandler = () => {
    gameLogic.switchActivePlayer();
    setGame(gameLogic.getState());
  };

  return (
    <GameLogicContext.Provider
      value={{ game: game, refreshState: refreshState } as GameContext}
    >
      <div className="App">
        {game.gameStage === "setup" ? (
          <GameSetup />
        ) : (
          <div
            className="playfield"
            // style={{ transform: `translateY(${game.playerActive ? 0 : -100}vh)` }}
          >
            <div id="enemy-screen" className="screen">
              <Grid board={game.enemyBoard} isEnemy={true} />
            </div>
            <div id="rotation-container">
              <ImArrowUp
                className="activePlayerIndicator"
                style={{
                  transform: `rotate(${game.playerActive ? 0 : 180}deg)`,
                }}
              />
            </div>
            <div id="player-screen" className="screen">
              <Grid board={game.playerBoard} isEnemy={false} />
              {/* <button onClick={switchHandler}>wechseln</button> */}
            </div>
          </div>
        )}
      </div>
    </GameLogicContext.Provider>
  );
};

export default App;
