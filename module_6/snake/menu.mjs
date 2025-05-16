"use strict";

/* Use this file to create the menu for the snake game. */

import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D     from "../../common/libs/lib2d_v2.mjs";
import { SheetData, GameProps, EGameStatus, newGame } from "./game.mjs";

export class TMenu {
  #spcvs;
  #btnPlay;
  #btnPause;
  #btnRetry;
  #scoreSprite;
  #bgGameOver;
  #btnHome;


  constructor(spcvs) {
    this.#spcvs = spcvs;
    //Lager Play knappen som gjør at spilleren kan starte
    this.#btnPlay = new libSprite.TSpriteButton(
      spcvs,
      SheetData.Play,
      new lib2D.TPoint(350, 200)
    );
    // Bg
     this.#bgGameOver = new libSprite.TSprite(
      spcvs,
      SheetData.GameOver,
      new lib2D.TPosition(25, 40)
    );
    // Home
     this.#btnHome = new libSprite.TSpriteButton(
      spcvs,
      SheetData.Home,
      new lib2D.TPoint(75, 350)
    );
    this.#btnHome.onClick = () => {
  // Går tilbake til Idle‐state 
  GameProps.gameStatus      = EGameStatus.Idle;
  // Skjuler score‐visningen
  this.#scoreSprite.visible = false;
  // Nullstiller brettet
  GameProps.gameBoard.reset();
};
    // oppretter Pause/Resume-knapp
    this.#btnPause = new libSprite.TSpriteButton(
      spcvs,
      SheetData.Resume,
      new lib2D.TPoint(340, 250)
    );
    this.#btnPause.animateSpeed = 10;
    
    this.#btnRetry = new libSprite.TSpriteButton(
      spcvs,
      SheetData.Retry,
      new lib2D.TPosition(630, 350)
    );
    this.#btnRetry.onClick = () => {console.log("Button 1 clicked");};
    
    this.#scoreSprite = new libSprite.TSpriteNumber(
      spcvs,
      SheetData.Number,
      new lib2D.TPoint(10, 10)
    );
    this.#scoreSprite.scale   = 0.5;
    this.#scoreSprite.alpha   = 0.8;
    this.#scoreSprite.visible = false;
    this.#scoreSprite.value   = 0;
  }

  init() {
    
    this.#spcvs.canvas.addEventListener("mousedown", (evt) => {
      const x = evt.offsetX, y = evt.offsetY;

      // Play-knapp
      if (
        GameProps.gameStatus === EGameStatus.Idle &&
        this.#hit(this.#btnPlay, x, y)
      ) {
        GameProps.gameStatus      = EGameStatus.Playing; // starter spill
        this.#scoreSprite.visible = true;                // viser score
        newGame()
      }
      // Pause/Resume-knapp
      else if (
        (GameProps.gameStatus === EGameStatus.Playing ||
         GameProps.gameStatus === EGameStatus.Pause) &&
        this.#hit(this.#btnPause, x, y)
      ) {
        GameProps.gameStatus =
          GameProps.gameStatus === EGameStatus.Playing
            ? EGameStatus.Pause
            : EGameStatus.Playing;                      
      }
      // Retry-knapp når GameOver
      else if (
        GameProps.gameStatus === EGameStatus.GameOver &&
        this.#hit(this.#btnRetry, x, y)
      ) {
        newGame()
      }
    });
  }

  draw() {
    // Tegner Play når Idle
    if (GameProps.gameStatus === EGameStatus.Idle) {
      this.#btnPlay.draw();
    }
    // Tegner Pause/Resume når spill i gang eller pause
    // Tegner Resume-knapp kun når spillet er paused
if (GameProps.gameStatus === EGameStatus.Pause) {
  this.#btnPause.draw();
}
    // Tegner Retry når GameOver
    if (GameProps.gameStatus === EGameStatus.GameOver) {
      this.#btnRetry.draw();
      this.#bgGameOver.draw();
    }
    // tegn score hvis synlig
    if (this.#scoreSprite.visible) {
      this.#scoreSprite.value = GameProps.score;     // Oppdaterer score verdi
      this.#scoreSprite.draw();                      // Tegner scoren
    }
  }

  // Enkel rektangel hit-test for sprites
  #hit(sprite, x, y) {
    return (
      x >= sprite.x &&
      x <= sprite.x + sprite.spi.width &&
      y >= sprite.y &&
      y <= sprite.y + sprite.spi.height
    );
  }
}