import React, { useContext } from "react";
import { Board, Field, GameContext } from "../../models/types";
import "./grid.scss";
import { GameStateContext } from "../../App";
import { enemyShot } from "../../util/helperFunctions";

interface GridProps {
  board: Board;
  isEnemy: boolean;
}

export const Grid: React.FunctionComponent<GridProps> = (props: GridProps) => {
  const { game, setGame } = useContext(GameStateContext) as GameContext;

  function clickHandler(field: Field) {
    if (props.isEnemy) {
      let gameBoard = game.enemyBoard;
      gameBoard[field.y][field.x].status = "x";
      let ownBoard = enemyShot(game.playerBoard);
      setGame((prev) => {
        return {
          ...prev,
          enemyBoard: gameBoard,
          playerBoard: ownBoard,
        };
      });
    } else {
      console.log("shot yourself");
    }
  }

  return (
    <div className="board">
      {props.board.map((row) => (
        <div className="row" key={crypto.randomUUID()}>
          {row.map((field) => (
            <div
              className="field"
              key={field.id}
              onClick={() => clickHandler(field)}
            >
              {field.status}
              {/* {`${field.x} / ${field.y}`} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
