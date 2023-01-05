import React, { useContext } from "react";
import { Board, Field } from "./models/types";
import "./grid.scss";
import { GameLogicContext } from "./App";
import { Game } from "./GameLogic";

interface GridProps {
  board: Board;
  isEnemy: boolean;
}

const gameLogic = Game.getInstance();

export const Grid: React.FunctionComponent<GridProps> = (props: GridProps) => {
  const { refreshState } = useContext(GameLogicContext);

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    field: Field
  ) => {
    gameLogic.shoot(field.x, field.y);
    refreshState();
    console.log(field);
  };

  return (
    <div className="board">
      {props.board.map((row) => (
        <div className="row" key={crypto.randomUUID()}>
          {row.map((field) => (
            <div
              className="field"
              key={field.id}
              onClick={(e) => onClickHandler(e, field)}
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
