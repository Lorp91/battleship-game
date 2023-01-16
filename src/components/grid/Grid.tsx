import React, { useContext } from "react";
import { Board, Field, GameContext, Status } from "../../models/types";
import "./grid.scss";
import { GameStateContext } from "../../App";
import { enemyShot, removeShipPart } from "../../util/helperFunctions";

interface GridProps {
  board: Board;
  isEnemy: boolean;
}

export const Grid: React.FunctionComponent<GridProps> = (props: GridProps) => {
  const { game, setGame } = useContext(GameStateContext) as GameContext;

  const shot = (x: number, y: number, isEnemy: boolean): Status | true => {
    if (isEnemy) {
      switch (game.enemyBoard[y][x].status) {
        case "":
          return "x";
        case "o":
          return "!";
        case "x":
        case "!":
          return true;
      }
    } else {
      switch (game.playerBoard[y][x].status) {
        case "":
          return "x";
        case "o":
          return "!";
        case "x":
        case "!":
          return true;
      }
    }
  };

  function clickHandler(field: Field) {
    if (props.isEnemy) {
      let enemyboard = game.enemyBoard;
      let res = shot(field.x, field.y, props.isEnemy);
      if (res === true) return;
      if (res === "!") {
        let newFleet = removeShipPart(field.x, field.y, game.enemyShips);
        setGame((prev) => ({ ...prev, enemyShips: newFleet }));
      }
      enemyboard[field.y][field.x].status = res;

      let ownboard = game.playerBoard;
      let coord = enemyShot(ownboard);
      let shotres = shot(coord.x, coord.y, false);
      if (shotres === true) throw new Error("enemyshot wrong!");
      if (shotres === "!") {
        let newFleet = removeShipPart(coord.x, coord.y, game.playerShips);
        setGame((prev) => ({ ...prev, playerShips: newFleet }));
      }
      ownboard[coord.y][coord.x].status = shotres;

      setGame((prev) => ({
        ...prev,
        playerBoard: ownboard,
        enemyBoard: enemyboard,
      }));
    } else {
      console.log("shot yourself");
    }
  }

  const classHandler = (field: Field) => {
    let str = "field";
    switch (field.status) {
      case "o":
        if (props.isEnemy) {
          str += " water";
        } else {
          str += " ship";
        }
        break;
      case "!":
        str += " ship-shot";
        break;
      case "":
        str += " water";
        break;
      case "x":
        str += " water-shot";
        break;
    }
    return str;
  };

  return (
    <div className="board">
      {props.board.map((row) => (
        <div className="row" key={crypto.randomUUID()}>
          {row.map((field) => (
            <div
              className={classHandler(field)}
              key={field.id}
              onClick={() => clickHandler(field)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
