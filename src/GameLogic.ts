import { Board, Field, Row } from "./models/types";

export class Game {
  private static instance: Game;
  public playerBoard: Board;
  public enemyBoard: Board;
  public playerActive: boolean;
  public gameStage: "setup" | "playing";

  static getInstance(): Game {
    if (Game.instance) {
      return this.instance;
    }
    this.instance = new Game();
    return this.instance;
  }

  public switchActivePlayer() {
    this.playerActive = !this.playerActive;
    if (!this.playerActive) {
      setTimeout(() => {
        this.enemyShot();
      }, 50);
    }
  }

  public getState() {
    const state = {
      gameStage: this.gameStage,
      playerActive: this.playerActive,
      playerBoard: this.playerBoard,
      enemyBoard: this.enemyBoard,
    };
    return state;
  }

  public shoot(x: number, y: number): boolean {
    let validShot: boolean = true;
    if (this.playerActive) {
      this.enemyBoard[y][x].status = "x";
    }
    if (validShot) {
      this.switchActivePlayer();
    }
    return validShot;
  }

  private constructor() {
    // TODO: münzwurf rein
    this.playerActive = false;
    this.playerBoard = this.boardSetup();
    this.enemyBoard = this.boardSetup();
    this.gameStage = "setup";
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

  private enemyShot() {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    this.playerBoard[y][x].status = "x";
  }
}
