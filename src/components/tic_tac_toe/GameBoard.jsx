import React from 'react'
import GameCell from './GameCell';

function getBoardGridSize(gridSize=3) {
    const boardClasses = ['gameBoard'];

    if (gridSize == 9) boardClasses.push('game3x3');
    if (gridSize == 16) boardClasses.push('game4x4');

    return boardClasses.join(' ');
}

const GameBoard = ({ board, gridSize, winningCells, isGameOver, onPlay }) => {
    return (
        <div className={getBoardGridSize(gridSize)} role="grid" aria-label="Tic tac toe board">
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
