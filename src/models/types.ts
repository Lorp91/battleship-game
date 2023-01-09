// Board setup
export interface Field {
  id: string;
  x: number;
  y: number;
  status: Status;
}
// "" - wasser "x" - wasserschuss "o" - schiff "!" - getroffenes schiff
export type Status = "" | "x" | "o" | "!";
export type Row = [
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field
];
export type Board = [Row, Row, Row, Row, Row, Row, Row, Row, Row, Row];

export interface GameState {
  playerActive: boolean;
  playerBoard: Board;
  enemyBoard: Board;
  gameStage: "setup" | "playing";
}

export interface GameContext {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}
