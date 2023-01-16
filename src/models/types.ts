// Board setup
export interface Field {
  id: string;
  x: number;
  y: number;
  status: Status;
  ship: "" | "active" | "locked";
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

export interface ShipPart {
  x: number | null;
  y: number | null;
}

export type Ship = {
  name: string;
  locked: boolean;
  orientation: "h" | "v";
  body: ShipPart[];
};

export interface GameState {
  playerActive: boolean;
  playerBoard: Board;
  playerShips: Ship[];
  enemyBoard: Board;
  enemyShips: Ship[];
  gameStage: "setup" | "playing";
}

export interface GameContext {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}
