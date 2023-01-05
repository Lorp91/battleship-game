import React from "react";
import { Field } from "./models/types";
import "./grid.scss";

interface GridProps {
  board: Field[][];
  isEnemy: boolean;
}

export const Grid: React.FunctionComponent<GridProps> = (props: GridProps) => {
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {};

  return (
    <div className="board">
      {props.board.map((row) => (
        <div className="row" key={crypto.randomUUID()}>
          {row.map((field) => (
            <div className="field" key={field.id} onClick={onClickHandler}>
              {`${field.x} / ${field.y}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
