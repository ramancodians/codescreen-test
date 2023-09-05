import React, { useState } from "react";
import Piece, { IPlayer, IPiece } from "./Piece";
import { styled } from "styled-components";

/**
 * 8x8 board for the game where the gameplay happens.
 */


type ICell = Pick<IPiece, "id" | "player"> & {
  row: number,
  cell: number,
}
type IRow = ICell[]
type IBoardMap = IRow[]

// Styles
const BoardWrap = styled.div`
  width: 800px;
  height: 800px;
`
const BoardRow = styled.div`
  display: flex;
`

const getPlayerBasedOnId = (id: number): IPlayer | undefined => {
  console.log("call");

  if (id > 1 && id <= 24 && id % 2 === 0) {
    return "White"
  }
  if (id > 40 && id < 64 && id % 2 != 0) {
    return "Black"
  }
  return
}

const createBoardMap = (): IBoardMap => {
  const board: IBoardMap = []
  let id = 1
  for (let i = 1; i <= 8; i++) {
    board.push([])
    for (let j = 1; j <= 8; j++) {
      board[i - 1].push({
        id,
        row: i - 1,
        cell: j - 1,
        player: getPlayerBasedOnId(id)
      })
      id++;
    }
  }
  return board
}

const initBoard = createBoardMap()
const Board = () => {
  const [boardMap, updateBoardMap] = useState<IBoardMap>(initBoard)
  const [activeTurn, updateActiveTurn] = useState<IPlayer>("White")
  const [activePiece, updateActivePiece] = useState<ICell | null>()
  const [killZones, updateKillZones] = useState<number[]>([])
  const [allowedMoves, updateAllowedMoves] = useState<number[]>([])

  const getCellBasedOnId = (id: number) => {
    const row = Math.floor(id / 8)
    const cell = Math.floor(id % 8)
    console.log({
      row, cell
    });

    return row
  }

  const selectPiece = (piece: ICell) => {
    console.log(getCellBasedOnId(piece.id));


    if (activePiece) {
      moveToken(piece)
      return
    }
    if (!piece.player) {
      console.log("No Token at this place");
      updateActivePiece(undefined)
      updateAllowedMoves([])
      return
    }

    if (activeTurn === piece.player) {
      updateActivePiece(piece)
      const moves: number[] = []
      if (piece.player === "White") {
        const nextRow = piece.id + 8
        // left edge
        if ((piece.id - 1) % 8 != 0) {
          moves.push(nextRow - 1)
        }
        // Right edge
        if (piece.id % 8 != 0) {
          moves.push(nextRow + 1)
        }
        updateAllowedMoves(moves)
      }

      if (piece.player === "Black") {
        const prevRow = piece.id - 8
        // left edge
        if ((piece.id - 1) % 8 != 0) {
          moves.push(prevRow - 1)
        }
        // Right edge
        if (piece.id % 8 != 0) {
          moves.push(prevRow + 1)
        }
        updateAllowedMoves(moves)
      }
    }
  }

  const moveToken = (to: ICell) => {
    if (!allowedMoves || !activePiece) {
      return
    }
    if (!allowedMoves.includes(to.id)) {
      console.log("Move not allowed");
      return
    }
    console.log(`Move ${activePiece.id} to ${to.id}`);
    updateBoardMap(board => {
      console.log(to, activePiece);
      const newBoard = [...board]
      newBoard[to.row][to.cell].player = activePiece.player
      newBoard[activePiece.row][activePiece.cell].player = undefined
      return newBoard
    })
    updateActivePiece(null)
    updateActiveTurn(activeTurn === "White" ? "Black" : "White")
    updateAllowedMoves([])
  }

  const getHasAKill = (peice: ICell): boolean => {
    return false
  }

  return (
    <div>
      <div>
        Active Player : {activeTurn}
      </div>
      <BoardWrap
        className="board-container"
      // Style added just for reference, feel free to remove it
      >
        {boardMap.map((row, _index) => (
          <BoardRow key={_index}>
            {boardMap[_index].map(cell => (
              <Piece
                {...cell}
                selectForMove={() => {
                  selectPiece(cell)
                }}
                isSelectForMove={activePiece?.id === cell.id}
                isAllowedToMove={allowedMoves.includes(cell.id)}
                hasAKill={getHasAKill(cell)}
                moveToken={() => moveToken(cell)}
              />
            ))}
          </BoardRow>
        ))}
      </BoardWrap>
    </div>
  );
};

export default Board;
