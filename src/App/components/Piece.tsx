import React, { useState } from "react"
import { styled } from "styled-components"

export type IPlayer = "White" | "Black"
export interface IPiece {
  id: number,
  isKing?: boolean,
  player?: IPlayer,
  isSelectForMove: boolean,
  isAllowedToMove: boolean,
  hasAKill: boolean,
  selectForMove: () => void
  moveToken: () => void
}
interface WrapperProsp {
  isSelectForMove: boolean,
  isMoveAllowed: boolean
  hasAKill: boolean
}
const Wrapper = styled.div<WrapperProsp>`
  width: 100px;
  height: 100px;
  border: 1px solid red;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;

  ${props => props.isSelectForMove && `
    border: blue 2px solid;
  `}
  ${props => props.isMoveAllowed && `
    border: green 2px solid;
  `}
  ${props => props.hasAKill && `
    rgb(255, 216, 216)
  `}
`

const Token = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: #666;
`



const Piece = (props: IPiece) => {
  const [] = useState<string>("")
  return (
    <Wrapper
      onClick={props.selectForMove}
      isSelectForMove={props.isSelectForMove}
      isMoveAllowed={props.isAllowedToMove}
      hasAKill={props.hasAKill}
    >
      {props.player && (
        <Token style={{
          background: props.player === "Black" ? "#333" : "red"
        }} />
      )}
      {props.id}
    </Wrapper>
  )
}

export default Piece