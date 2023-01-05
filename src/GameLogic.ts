import { Board, Field, Row } from "./models/types";

export class Game {
  private static instance: Game;
  public playerBoard: Board;
  public enemyBoard: Board;
  public playerActive: boolean;

  static getInstance(): Game {
    if (Game.instance) {
      return this.instance;
    }
    this.instance = new Game();
    return this.instance;
  }

  public switchActivePlayer() {
    this.playerActive = !this.playerActive;
  }

  public getState() {
    const state = {
      playerActive: this.playerActive,
      playerBoard: this.playerBoard,
      enemyBoard: this.enemyBoard,
    };
    return state;
  }

  private constructor() {
    // TODO: münzwurf rein
    this.playerActive = true;
    this.playerBoard = this.boardSetup();
    this.enemyBoard = this.boardSetup();
  }

  private boardSetup(): Board {
    let board: Partial<Board> = [];
    for (let i = 0; i < 10; i++) {
      let row: Partial<Row> = [];
      for (let j = 0; j < 10; j++) {
        const field: Field = {
          id: crypto.randomUUID(),
          x: j,
          y: i,
          status: "",
        };
        row.push(field);
      }
      board.push(row as Row);
    }
    return board as Board;
  }
}
