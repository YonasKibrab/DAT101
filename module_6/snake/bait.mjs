"use strict";

import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.mjs";

export class TBait extends libSprite.TSprite {
  #boardCell = null;

  constructor(aSpriteCanvas) {
    // Start‐posisjon settes først her; oppdateres i update()
    const pos = new lib2D.TPoint(0, 0);
    super(aSpriteCanvas, SheetData.Bait, pos);
    this.#boardCell = new TBoardCell(0, 0);
    this.update();
  }

  update() {
    // 1) Tøm forrige bait‐celle hvis den fortsatt er merket
    const prev = GameProps.gameBoard.getCell(
      this.#boardCell.row,
      this.#boardCell.col
    );
    if (prev && prev.infoType === EBoardCellInfoType.Bait) {
      prev.infoType = EBoardCellInfoType.Empty;
    }

    // 2) Finn en ny tom celle
    let cellInfo;
    do {
      this.#boardCell.col = Math.floor(
        Math.random() * GameProps.gameBoard.cols
      );
      this.#boardCell.row = Math.floor(
        Math.random() * GameProps.gameBoard.rows
      );
      cellInfo = GameProps.gameBoard.getCell(
        this.#boardCell.row,
        this.#boardCell.col
      );
    } while (!cellInfo || cellInfo.infoType !== EBoardCellInfoType.Empty);

    // 3) Merk den nye cellen som bait
    cellInfo.infoType = EBoardCellInfoType.Bait;

    // 4) Oppdater sprite‐posisjon i pixler
    this.x = this.#boardCell.col * this.spi.width;
    this.y = this.#boardCell.row * this.spi.height;
  }
}
