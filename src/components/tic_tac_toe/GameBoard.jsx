import React from 'react'
import GameCell from './GameCell';

const GameBoard = ({ board, winningCells, isGameOver, onPlay }) => {
    return (
        <div className="gameBoard" role="grid" aria-label="Tic tac toe board">
            {
                board.map((value, index) => (
                    <GameCell
                        key={index}
                        index={index}
                        value={value}
                        isWinningCell={winningCells.includes(index)}
                        disabled={isGameOver || Boolean(value)}
                        onPlay={onPlay}
                    />
                ))
            }
        </div>
    )
}

export default GameBoard
