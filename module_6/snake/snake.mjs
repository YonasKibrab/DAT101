"use strict";

//------------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//------------------------------------------------------------------------------------------

import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D      from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData, bateIsEaten } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType }   from "./gameBoard.mjs";

//------------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
//------------------------------------------------------------------------------------------

const ESpriteIndex = {UR: 0, LD: 0, RU: 1, DR: 1, DL: 2, LU: 2, RD: 3, UL: 3, RL: 4, UD: 5};
export const EDirection = { Up:0, Right:1, Left:2, Down:3 };


//-----------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

class TSnakePart extends libSprite.TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aBoardCell) {
    const pos = new lib2D.TPoint(
      aBoardCell.col * aSpriteInfo.width,
      aBoardCell.row * aSpriteInfo.height
    );
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.boardCell = aBoardCell;
    const ci = GameProps.gameBoard.getCell(aBoardCell.row, aBoardCell.col);
    this.direction = ci.direction;
    ci.infoType = EBoardCellInfoType.Snake;
    this.index = this.direction;
  }

  update() {
    this.x = this.boardCell.col * this.spi.width;
    this.y = this.boardCell.row * this.spi.height;
  }
} // class TSnakePart


class TSnakeHead extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Head, aBoardCell);
    this.newDirection = this.direction;
    this.onEat = null;                               // Lager en funskjon som kan kjøres når sslangehodet spiser eplet
  }

  setDirection(aDirection) {
    if ((this.direction === EDirection.Right || this.direction === EDirection.Left) && (aDirection === EDirection.Up || aDirection === EDirection.Down)) {
      this.newDirection = aDirection;
    } else if ((this.direction === EDirection.Up || this.direction === EDirection.Down) && (aDirection === EDirection.Right || aDirection === EDirection.Left)) {
      this.newDirection = aDirection;
    }
  }

  update() {
    GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col).direction = this.newDirection;
    switch (this.newDirection) {
      case EDirection.Up:
        this.boardCell.row--;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        break;
    }
    this.direction = this.newDirection;
    this.index = this.direction;

    const ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!ci || ci.infoType === EBoardCellInfoType.Snake) {
      return false; // Collision detected, do not continue
    }
    // spiste bait
    if (ci.infoType === EBoardCellInfoType.Bait) {
      bateIsEaten();
      if (this.onEat) this.onEat();                  // Når slangehodet spiser bait, får restten av slangen beskjed
    }
    ci.infoType = EBoardCellInfoType.Snake; // Set the cell to Snake
    super.update();
    return true;  // No collision, continue
  }
}

class TSnakeBody extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Body, aBoardCell);
    this.index = ESpriteIndex.RL;
  }

  update() {
    let idx;
    let ci;
    switch (this.direction) {
      case EDirection.Up:
        this.boardCell.row--;
        ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        idx = (ci.direction !== this.direction)
          ? (ci.direction === EDirection.Left ? ESpriteIndex.UL : ESpriteIndex.UR)
          : ESpriteIndex.UD;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        idx = (ci.direction !== this.direction)
          ? (ci.direction === EDirection.Up ? ESpriteIndex.RU : ESpriteIndex.RD)
          : ESpriteIndex.RL;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        idx = (ci.direction !== this.direction)
          ? (ci.direction === EDirection.Up ? ESpriteIndex.LU : ESpriteIndex.LD)
          : ESpriteIndex.RL;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        idx = (ci.direction !== this.direction)
          ? (ci.direction === EDirection.Left ? ESpriteIndex.DR : ESpriteIndex.DL)
          : ESpriteIndex.UD;
        break;
    }
    this.direction = ci.direction;
    this.index = idx;
    super.update();
  }

  clone() {
    const seg = new TSnakeBody(
      this.spcvs,
      new TBoardCell(this.boardCell.col, this.boardCell.row)
    );
    seg.direction = this.direction;
    seg.index     = this.index;
    return seg;
  }

}// class TSnakeBody


class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Tail, aBoardCell);
  }

  update() {
    // tøm gammel hale‐celle
    let ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    ci.infoType = EBoardCellInfoType.Empty; // Clear the cell, before moving the tail

    switch (this.direction) {
      case EDirection.Up:
        this.boardCell.row--;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        break;
    }

    ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    this.direction = ci.direction;
    this.index     = this.direction;
    super.update();
  }

  clone() {
    const seg = new TSnakeBody(
      this.spcvs,
      new TBoardCell(this.boardCell.col, this.boardCell.row)
    );
    seg.direction = this.direction;
    seg.index     = this.index;
    return seg;
  }
}// class TSnakeTail


export class TSnake {
  #isDead    = false;
  #baitEaten = false;                                 // Brukes for å vite om slangehalen skal vokse
  #head;
  #body;
  #tail;
  constructor(aSpriteCanvas, aBoardCell) {
    this.#head = new TSnakeHead(aSpriteCanvas, aBoardCell);
    let col = aBoardCell.col - 1;
    this.#head.onEat = () => { this.#baitEaten = true; };  //Når slangehodet  spiser bait settes Baiteaten til true

    this.#body = [
      new TSnakeBody(aSpriteCanvas, new TBoardCell(col, aBoardCell.row))
    ];
    col--;
    this.#tail = new TSnakeTail(aSpriteCanvas, new TBoardCell(col, aBoardCell.row));
  } // constructor

  draw() {
    this.#head.draw();
    for (let i = 0; i < this.#body.length; i++) {
      this.#body[i].draw();
    }
    this.#tail.draw();
  } // draw
  
  //Returns true if the snake is alive
  update() {
    if (this.#isDead) return false;

    // flytt hodet
    const alive = this.#head.update();
    if (!alive) {
      this.#isDead = true;
      return false;
    }

    // flytt kropp
    this.#body.forEach(part => part.update());

    // flytt hale kun hvis ikke nettopp spist
    if (this.#baitEaten) {
      this.#baitEaten = false;    // Spises en bait står halen i ro i en runde og vokser, etterpå setttes baiteaten til false slik at det ikke skjer flere ganger på rad
    } else {
      this.#tail.update();
    }

    return true;
  }

  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  } 

  grow() {
    //Bruker tail.clone() for vekst
    const seg = this.#tail.clone();
    this.#body.unshift(seg);
  }
}