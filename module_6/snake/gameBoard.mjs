"use strict";

import { EDirection } from "./snake.mjs";
import { SheetData } from "./game.mjs";                     // lagt til: import av SheetData for sprite‐størrelse

export const GameBoardSize = { Cols: 24, Rows: 18 };
export const EBoardCellInfoType = { Empty: 0, Snake: 1, Bait: 2 };

export class TBoardCell {
  constructor(aCol, aRow) {
    this.col = aCol;
    this.row = aRow;
  }
}

export class TBoardCellInfo {
  constructor() {
    this.direction = EDirection.Right;
    this.infoType  = EBoardCellInfoType.Empty;
  }
}

export class TGameBoard {
  #spcvs;
  #ctx;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    this.#ctx = this.#spcvs.context;
    this.cols      = GameBoardSize.Cols;
    this.rows      = GameBoardSize.Rows;
    this.gameBoard = [];

    this.cellWidth  = SheetData.Head.width;                // lagt til: celle‐bredde basert på head‐sprite
    this.cellHeight = SheetData.Head.height;               // lagt til: celle‐høyde basert på head‐sprite

    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        row.push(new TBoardCellInfo());
      }
      this.gameBoard.push(row);
    }
  }

  getCell(aRow, aCol) {
    if (aRow < 0 || aRow >= this.rows || aCol < 0 || aCol >= this.cols) {
      return null;
    }
    return this.gameBoard[aRow][aCol];
  }

  draw() {                                            // lagt til: metode for å tegne brettet
    const ctx = this.#ctx;
    // Bakgrunn
    ctx.fillStyle = "#fabd04";
    ctx.fillRect(0, 0, this.cols * this.cellWidth, this.rows * this.cellHeight);

    // Grid‐linjer
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth   = 1;

    // Vertikale linjer
    for (let c = 0; c <= this.cols; c++) {
      const x = c * this.cellWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.rows * this.cellHeight);
      ctx.stroke();
    }
    // Horisontale linjer
    for (let r = 0; r <= this.rows; r++) {
      const y = r * this.cellHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.cols * this.cellWidth, y);
      ctx.stroke();
    }
  }

  reset() {                                              // lagt til: reset av alle celler for nytt spill
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const ci = this.gameBoard[r][c];
        ci.infoType  = EBoardCellInfoType.Empty;
        ci.direction = EDirection.Right;
      }
    }
  }
}
