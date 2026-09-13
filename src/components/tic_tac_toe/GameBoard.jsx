import React from 'react'
import GameCell from './GameCell'

const GameBoard = ({ board, gameMode, winningCells, isGameOver, onPlay }) => {
    const boardStyle = {
        '--board-size': gameMode.boardSize
    };

    return (
        <div
            className="gameBoard"
            data-board-size={gameMode.boardSize}
            style={boardStyle}
            role="grid"
            aria-label={`${gameMode.label} tic tac toe board`}>
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
