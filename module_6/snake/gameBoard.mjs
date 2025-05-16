"use strict";

import { EDirection } from "./snake.mjs";
import { SheetData } from "./game.mjs";               

export const GameBoardSize = { Cols: 24, Rows: 18 };

export const EBoardCellInfoType = { Empty: 0, Snake: 1, Bait: 2 };

export class TBoardCell {
  constructor(aCol, aRow) {
    this.col = aCol;
    this.row = aRow;
  }
}// End off class TBoardCell
//------------------------------------------------------------------------------------------

export class TBoardCellInfo {
  constructor() {
    this.direction = EDirection.Right;
    this.infoType  = EBoardCellInfoType.Empty;
  }
}// End off class TBoardCellInfo
//------------------------------------------------------------------------------------------

export class TGameBoard {
  #spcvs;
  #ctx;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas; 
    this.#ctx = this.#spcvs.context;
    
    this.cols      = GameBoardSize.Cols;
    this.rows      = GameBoardSize.Rows;
    this.gameBoard = [];

    this.cellWidth  = SheetData.Head.width;                // Setter hvor bred hver rute skal være basert på Sheetdata
    this.cellHeight = SheetData.Head.height;               // Det samme som ovenfor, men høyden

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new TBoardCellInfo());
      }
      this.gameBoard.push(row);
    }
  } // End of constructor

  getCell(aRow, aCol) {
    if (aRow < 0 || aRow >= this.rows || aCol < 0 || aCol >= this.cols) {
      return null;
    }
    return this.gameBoard[aRow][aCol];
  } // End of getCell

  draw() {                                            
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

  reset() {                                              
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const ci = this.gameBoard[r][c];
        ci.infoType  = EBoardCellInfoType.Empty;
        ci.direction = EDirection.Right;
      }
    }
  }
}// End of class TGameBoard
//------------------------------------------------------------------------------------------