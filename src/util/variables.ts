import { GameState } from "../models/types";
import { boardSetup } from "./helperFunctions";

export const initialState: GameState = {
  playerBoard: boardSetup(),
  enemyBoard: boardSetup(),
  playerActive: true,
  gameStage: "setup",
};
