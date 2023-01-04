import React from "react";
import { Field } from "./App";
import "./grid.scss";

interface GridProps {
  board: Field[][];
}

export const Grid: React.FunctionComponent<GridProps> = (props: GridProps) => {
  return (
    <div className="board">
      {props.board.map((row) => (
        <div className="row">
          {row.map((field) => (
            <div className="field">{field}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
