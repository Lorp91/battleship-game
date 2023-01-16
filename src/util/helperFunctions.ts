import { Board, Field, Row, Ship } from "../models/types";

export function boardSetup(): Board {
  let board: Partial<Board> = [];
  for (let i = 0; i < 10; i++) {
    let row: Partial<Row> = [];
    for (let j = 0; j < 10; j++) {
      let field: Field = {
        id: crypto.randomUUID(),
        x: j,
        y: i,
        status: "",
        ship: "",
      };
      row.push(field);
    }
    board.push(row as Row);
  }
  return board as Board;
}

export function enemyShot(board: Board) {
  let run = true;
  let x: number = 0;
  let y: number = 0;
  while (run) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    if (board[y][x].status !== "x" && board[y][x].status !== "!") {
      run = false;
    }
  }
  return { x, y };
}

export function enemyShipSetup(enemyB: Board, enemyS: Ship[]) {
  for (let ship of enemyS) {
    let run = true;
    let orientation: "h" | "v" = "h";
    let x: number = 0;
    let y: number = 0;

    do {
      run = false;
      orientation = Math.floor(Math.random() * 2) ? "h" : "v";
      ship.orientation = orientation;
      x = Math.floor(Math.random() * (10 - ship.body.length - 1));
      y = Math.floor(Math.random() * (10 - ship.body.length - 1));

      for (let i = 0; i < ship.body.length; i++) {
        if (orientation === "h") {
          if (enemyB[y][x + i].status === "o") {
            run = true;
            break;
          }
        } else {
          if (enemyB[y + i][x].status === "o") {
            run = true;
            break;
          }
        }
      }
    } while (run);
    for (let i = 0; i < ship.body.length; i++) {
      if (orientation === "h") {
        ship.body[i].x = x + i;
        ship.body[i].y = y;
      } else {
        ship.body[i].x = x;
        ship.body[i].y = y + i;
      }
      enemyB[ship.body[i].y][ship.body[i].x].status = "o";
    }
  }
  return { enemyB, enemyS };
}
