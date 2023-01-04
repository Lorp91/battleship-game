import { useState } from "react";
import "./app.scss";
import { Grid } from "./Grid";

export type Field = "" | "x" | "o" | "!";

class Game {
  public playerBoard: Field[][] = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "o", "o", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "!", "!", "!", "!"],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "x", "x", "x", "", "", "", ""],
  ];
  public enemyBoard: Field[][] = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  public playerActive: boolean;

  constructor() {
    // münzwurf rein
    this.playerActive = true;
  }
}

const App: React.FunctionComponent<JSX.Element> = () => {
  const [game, setGame] = useState(new Game());

  return (
    <div className="App">
      <div
        className="playfield"
        style={{ transform: `translateY(${game.playerActive ? -100 : 0}vh)` }}
      >
        <div id="enemy-screen" className="screen">
          <Grid board={game.enemyBoard} />
          <button
            onClick={() =>
              setGame({ ...game, playerActive: !game.playerActive })
            }
          >
            wechseln
          </button>
        </div>
        <div
          id="player-screen"
          className="screen"
          style={{ position: "relative" }}
        >
          <Grid board={game.playerBoard} />
          <button
            onClick={() =>
              setGame({ ...game, playerActive: !game.playerActive })
            }
          >
            wechseln
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
