import React, { useContext, useEffect, useState } from "react";
import { GameStateContext } from "../../App";
import { Field, GameContext, Ship } from "../../models/types";
import { enemyShipSetup } from "../../util/helperFunctions";
import "./gameSetup.scss";

export const GameSetup: React.FC = () => {
  const { game, setGame } = useContext(GameStateContext) as GameContext;
  const [activeShip, setActiveShip] = useState<Ship | null>(
    game.playerShips[0]
  );
  const [showReady, setShowReady] = useState<boolean>(false);

  useEffect(() => {
    let valid = true;
    for (let ship of game.playerShips) {
      if (!ship.locked) valid = false;
    }
    setShowReady(valid);
  }, [activeShip]);

  const mouseEnterHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: Field
  ) => {
    if (activeShip === null) return;
    let board = game.playerBoard;
    for (let i = 0; i < activeShip.body.length; i++) {
      if (activeShip.orientation === "h") {
        if (field.x + i > 9) continue;
        if (board[field.y][field.x + i].ship === "locked") continue;
        board[field.y][field.x + i].ship = "active";
      } else {
        if (field.y + i > 9) continue;
        if (board[field.y + i][field.x].ship === "locked") continue;
        board[field.y + i][field.x].ship = "active";
      }
    }
    setGame((prev) => ({ ...prev, playerBoard: board }));
  };

  const mouseLeaveHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: Field
  ) => {
    // event.preventDefault();
    if (activeShip === null) return;
    let board = game.playerBoard;
    for (let i = 0; i < activeShip.body.length; i++) {
      if (activeShip.orientation === "h") {
        if (field.x + i > 9) continue;
        if (board[field.y][field.x + i].ship === "locked") continue;
        board[field.y][field.x + i].ship = "";
      } else {
        if (field.y + i > 9) continue;
        if (board[field.y + i][field.x].ship === "locked") continue;
        board[field.y + i][field.x].ship = "";
      }
    }
    setGame((prev) => ({ ...prev, playerBoard: board }));
  };

  const rightClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: Field
  ) => {
    event.preventDefault();
    if (activeShip === null) return;
    let board = game.playerBoard;
    if (activeShip.orientation === "h") {
      for (let i = 1; i < activeShip.body.length; i++) {
        if (board[field.y][field.x + i].ship !== "locked") {
          board[field.y][field.x + i].ship = "";
        }
        if (board[field.y + i][field.x].ship !== "locked") {
          board[field.y + i][field.x].ship = "active";
        }
      }
      setActiveShip((prev) => {
        if (prev === null) return prev;
        return { ...prev, orientation: "v" };
      });
    } else {
      for (let i = 1; i < activeShip.body.length; i++) {
        if (board[field.y][field.x + i].ship !== "locked") {
          board[field.y][field.x + i].ship = "active";
        }
        if (board[field.y + i][field.x].ship !== "locked") {
          board[field.y + i][field.x].ship = "";
        }
      }
      setActiveShip((prev) => {
        if (prev === null) return prev;
        return { ...prev, orientation: "h" };
      });
    }
  };

  const leftClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: Field
  ) => {
    event.preventDefault();
    if (activeShip === null) return;
    let board = game.playerBoard;
    let ship = activeShip;
    for (let i = 0; i < activeShip.body.length; i++) {
      if (activeShip.orientation === "h") {
        board[field.y][field.x + i].ship = "locked";
        ship.body[i] = { y: field.y, x: field.x + i };
      } else {
        board[field.y + i][field.x].ship = "locked";
        ship.body[i] = { y: field.y + i, x: field.x };
      }
    }
    ship.locked = true;
    let fleet = game.playerShips;
    let indexSwitch = fleet.findIndex(
      (fleetship) => fleetship.name === ship.name
    );
    fleet[indexSwitch] = ship;

    let index = fleet.findIndex((ship) => ship.locked === false);
    if (index === -1) {
      setActiveShip(null);
    } else {
      setActiveShip(fleet[index]);
    }
    setGame((prev) => {
      return {
        ...prev,
        playerBoard: board,
        playerShips: fleet,
      };
    });
  };

  const shipChange = (targetShip: string) => {
    let board = game.playerBoard;
    let fleet = game.playerShips;
    let index = game.playerShips.findIndex((ship) => ship.name === targetShip);
    if (index === -1) throw new Error("cannot find ship");
    fleet[index].locked = false;
    game.playerShips[index].body.forEach((part) => {
      if (part.x === null || part.y === null) return;
      board[part.y][part.x].ship = "";
    });
    setGame((prev) => ({ ...prev, playerBoard: board, playerShips: fleet }));
    setActiveShip(fleet[index]);
  };

  return (
    <div id="setup-container">
      <h2>Flottenadmiral, platzieren Sie ihre Schiffe!</h2>
      <div className="ships">
        {game.playerShips.map((ship) => (
          <button
            key={crypto.randomUUID()}
            onClick={() => shipChange(ship.name)}
          >
            {ship.name}
          </button>
        ))}
      </div>
      <div className="battlefield">
        {game.playerBoard.map((row, index) => (
          <div className="row" key={index}>
            {row.map((field, index) => (
              <div
                key={index}
                className={`field ${field.ship}`}
                onMouseOver={(e) => mouseEnterHandler(e, field)}
                onMouseLeave={(e) => mouseLeaveHandler(e, field)}
                onContextMenu={(e) => rightClickHandler(e, field)}
                onClick={(e) => leftClickHandler(e, field)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {showReady && (
        <button
          id="game-start"
          onClick={() => {
            let board = game.playerBoard;
            for (let i = 0; i < 10; i++) {
              for (let j = 0; j < 10; j++) {
                if (board[i][j].ship === "locked") {
                  board[i][j].status = "o";
                }
              }
            }
            let { enemyB, enemyS } = enemyShipSetup(
              game.enemyBoard,
              game.enemyShips
            );
            setGame((prev) => ({
              ...prev,
              playerBoard: board,
              enemyBoard: enemyB,
              enemyShips: enemyS,
              gameStage: "playing",
            }));
          }}
        >
          in die Schlacht!
        </button>
      )}
      <div className="controls">
        <h4>so wird gespielt:</h4>
        <p>Alle 5 Schiffe müssen auf dem Spielfeld platziert werden.</p>
        <ul>
          <li>Träger - 5 blöcke lang</li>
          <li>Schlachtschiff - 4 blöcke lang</li>
          <li>Kreuzer - 3 blöcke lang</li>
          <li>U-Boot - 3 blöcke lang</li>
          <li>Zerstörer - 2 blöcke lang</li>
        </ul>
        <p>
          Wenn man mit der Maus über das Schlachtfeld fährt kann man sehen wo
          das Schiff platziert wird.
        </p>
        <ul>
          <p>Mit Linksklick wird das Schiff platziert.</p>
          <p>Mit Rechtsklick lässt sich das Schiff drehen.</p>
          <p>
            Die Knöpfe am Rand des Schlachtfelds dienen zur Neubelegung eines
            Schiffes für die unentschlossenen.
          </p>
        </ul>
        <p>
          Wenn ihre komplette Flotte in Formation ist kann die Schlacht
          beginnen.
        </p>
        <p>Viel Glück da draussen... Sie werden es brauchen.</p>
      </div>
    </div>
  );
};
