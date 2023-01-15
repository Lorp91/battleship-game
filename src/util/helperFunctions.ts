import { Board, Field, Row } from "../models/types";

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

export function enemyShot(board: Board): Board {
  let x = Math.floor(Math.random() * 9);
  let y = Math.floor(Math.random() * 9);
  board[x][y].status = "x";
  return board;
}
