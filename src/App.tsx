import { createContext, useState } from "react";
import "./app.scss";
import { GameContext, GameState } from "./models/types";
import { GameSetup } from "./components/gameSetup/GameSetup";
import { GamePlaying } from "./components/gamePlaying/GamePlaying";
import { initialState } from "./util/variables";

export const GameStateContext = createContext<GameContext | null>(null);

const App: React.FunctionComponent<JSX.Element> = () => {
  const [game, setGame] = useState<GameState>(initialState);

  return (
    <GameStateContext.Provider value={{ game, setGame } as GameContext}>
      <div className="App">
        {game.gameStage === "setup" ? <GameSetup /> : <GamePlaying />}
      </div>
    </GameStateContext.Provider>
  );
};

export default App;
