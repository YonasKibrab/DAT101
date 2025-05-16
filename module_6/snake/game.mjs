"use strict";

import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import { TMenu } from "./menu.mjs";                 // lagt til: import av meny-klassen

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier
let hndUpdateGame = null;

export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 },
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const GameProps = {
  gameBoard:  null,
  snake:      null,
  bait:       null,
  menu:       null,                             // lagt til: referanse til meny-instans
  score:      0,                                // lagt til: score-variabel
  gameStatus: EGameStatus.Idle,
};

export function newGame() {
  GameProps.gameBoard = new TGameBoard(spcvs);
  GameProps.snake     = new TSnake(spcvs, new TBoardCell(5, 5));
  GameProps.bait      = new TBait(spcvs);
  GameProps.score     = 0;                       // lagt til: nollstill score
  GameProps.gameStatus= EGameStatus.Playing;     // lagt til: sett status til Playing
  gameSpeed           = 4;
}

export function bateIsEaten() {
  console.log("Bait eaten!");
  GameProps.snake.grow();                        // lagt til: vekst-kall
  GameProps.score++;                             // lagt til: øk score
  GameProps.bait.update();                       // lagt til: respawn bait
  increaseGameSpeed();
}

function loadGame() {
  cvs.width  = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.menu = new TMenu(spcvs);             // lagt til: opprett meny
  GameProps.menu.init();                         // lagt til: initier klikk-lyttere

  //newGame(); // Start nytt spill

  requestAnimationFrame(drawGame);
  console.log("Game canvas is rendering!");
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
  console.log("Game canvas is updating!");
}

function drawGame() {
  spcvs.clearCanvas();

  if (
    GameProps.gameStatus === EGameStatus.Playing ||
    GameProps.gameStatus === EGameStatus.Pause
  ) {
    GameProps.gameBoard.draw();    // lagt til: tegn brett
    GameProps.bait.draw();
    GameProps.snake.draw();
  }

  GameProps.menu.draw();                         // lagt til: tegn meny (inkl. score)

  requestAnimationFrame(drawGame);
}

function updateGame() {
  console.log(GameProps.gameStatus)
  if (GameProps.gameStatus === EGameStatus.Playing) {
    if (!GameProps.snake.update()) {
      GameProps.gameStatus = EGameStatus.GameOver; // lagt til: sett GameOver
      clearInterval(hndUpdateGame);                // lagt til: stopp oppdatering
    }
  }
}

function increaseGameSpeed() {
  clearInterval(hndUpdateGame);                   // lagt til: resett interval
  gameSpeed++;
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
}

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
      if (GameProps.gameStatus === EGameStatus.Playing) {
        GameProps.gameStatus = EGameStatus.Pause; // lagt til: pause
        clearInterval(hndUpdateGame);             // lagt til: stopp oppdatering
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        GameProps.gameStatus = EGameStatus.Playing; // lagt til: gjenoppta
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);
