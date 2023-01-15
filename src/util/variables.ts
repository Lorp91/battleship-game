import { GameState, Ship } from "../models/types";
import { boardSetup } from "./helperFunctions";

const shipArray: Ship[] = [
  {
    name: "Träger",
    locked: false,
    orientation: "h",
    body: [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ],
  },
  {
    name: "Schlachtschiff",
    locked: false,
    orientation: "h",
    body: [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ],
  },
  {
    name: "Kreuzer",
    locked: false,
    orientation: "h",
    body: [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ],
  },
  {
    name: "U-Boot",
    locked: false,
    orientation: "h",
    body: [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ],
  },
  {
    name: "Zerstörer",
    locked: false,
    orientation: "h",
    body: [
      { x: null, y: null },
      { x: null, y: null },
    ],
  },
];

export const initialState: GameState = {
  playerBoard: boardSetup(),
  playerShips: shipArray,
  enemyShips: shipArray,
  enemyBoard: boardSetup(),
  playerActive: true,
  gameStage: "setup",
};
