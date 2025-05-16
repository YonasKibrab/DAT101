"use strict";

import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D      from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData, bateIsEaten } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType }   from "./gameBoard.mjs";

const ESpriteIndex = { UR:0, RU:1, DL:2, DR:3, RL:4, UD:5 };
export const EDirection = { Up:0, Right:1, Left:2, Down:3 };

// Base‐klasse for et slange‐segment
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
}

// Hoved‐klasse for slangens hode
class TSnakeHead extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Head, aBoardCell);
    this.newDirection = this.direction;
    this.onEat = null;                               // lagt til: callback når bait spises
  }

  setDirection(aDirection) {
    const horiz   = (this.direction === EDirection.Left || this.direction === EDirection.Right);
    const vert    = (this.direction === EDirection.Up   || this.direction === EDirection.Down);
    const newHoriz= (aDirection === EDirection.Left   || aDirection === EDirection.Right);
    const newVert = (aDirection === EDirection.Up     || aDirection === EDirection.Down);
    if ((horiz && newVert) || (vert && newHoriz)) {
      this.newDirection = aDirection;
    }
  }

  update() {
    // lagre retning i cellen
    GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col).direction = this.newDirection;

    // flytt hodet
    switch (this.newDirection) {
      case EDirection.Up:    this.boardCell.row--; break;
      case EDirection.Right: this.boardCell.col++; break;
      case EDirection.Left:  this.boardCell.col--; break;
      case EDirection.Down:  this.boardCell.row++; break;
    }
    this.direction = this.newDirection;
    this.index = this.direction;

    const ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    // kollisjon med vegg eller egen kropp
    if (!ci || ci.infoType === EBoardCellInfoType.Snake) {
      return false;
    }
    // spiste bait
    if (ci.infoType === EBoardCellInfoType.Bait) {
      bateIsEaten();
      if (this.onEat) this.onEat();                  // lagt til: sett flagg via callback
    }
    ci.infoType = EBoardCellInfoType.Snake;
    super.update();
    return true;
  }
}

// Slangens kropp, håndterer hjørner
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
    // Returnerer et nytt kroppssegment på samme posisjon
    const seg = new TSnakeBody(
      this.spcvs,
      new TBoardCell(this.boardCell.col, this.boardCell.row)
    );
    seg.direction = this.direction;
    seg.index     = this.index;
    return seg;
  }
}

// Slangens hale
class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Tail, aBoardCell);
  }

  update() {
    // tøm gammel hale‐celle
    let ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    ci.infoType = EBoardCellInfoType.Empty;

    // flytt halen
    switch (this.direction) {
      case EDirection.Up:    this.boardCell.row--; break;
      case EDirection.Right: this.boardCell.col++; break;
      case EDirection.Left:  this.boardCell.col--; break;
      case EDirection.Down:  this.boardCell.row++; break;
    }

    ci = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    this.direction = ci.direction;
    this.index     = this.direction;
    super.update();
  }

  clone() {
    // lagt til: gir clone-metode for halen
    const seg = new TSnakeBody(
      this.spcvs,
      new TBoardCell(this.boardCell.col, this.boardCell.row)
    );
    seg.direction = this.direction;
    seg.index     = this.index;
    return seg;
  }
}

// Hoved‐klasse for Snake
export class TSnake {
  #isDead    = false;
  #baitEaten = false;                                 // lagt til: flagg for vekst
  #head;
  #body;
  #tail;

  constructor(aSpriteCanvas, aBoardCell) {
    this.#head = new TSnakeHead(aSpriteCanvas, aBoardCell);
    this.#head.onEat = () => { this.#baitEaten = true; };  // lagt til: bind callback

    let col = aBoardCell.col - 1;
    this.#body = [
      new TSnakeBody(aSpriteCanvas, new TBoardCell(col, aBoardCell.row))
    ];
    col--;
    this.#tail = new TSnakeTail(aSpriteCanvas, new TBoardCell(col, aBoardCell.row));
  }

  draw() {
    this.#head.draw();
    this.#body.forEach(part => part.draw());
    this.#tail.draw();
  }

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
      this.#baitEaten = false;                        // lagt til: nullstill flagg
    } else {
      this.#tail.update();
    }

    return true;
  }

  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  }

  grow() {
    // lagt til: bruk tail.clone() for vekst
    const seg = this.#tail.clone();
    this.#body.unshift(seg);
  }
}
