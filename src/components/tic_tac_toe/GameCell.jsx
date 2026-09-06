import React from 'react'

function getCellClassName(value, isWinningCell) {
    const cellClasses = ['gameCell'];

    if (value) cellClasses.push('filledCell');
    if (value === 'X') cellClasses.push('xCell');
    if (value === 'O') cellClasses.push('oCell');
    if (isWinningCell) cellClasses.push('winningCell');

    return cellClasses.join(' ');
}

const GameCell = ({ index, value, isWinningCell, disabled, onPlay }) => {
    const cellLabel = value
        ? `Cell ${index + 1}, ${value}`
        : `Cell ${index + 1}, empty`;

    return (
        <button
            className={getCellClassName(value, isWinningCell)}
            disabled={disabled}
            aria-label={cellLabel}
            onClick={() => { onPlay(index) }}>
            <span className="cellMark">{value}</span>
        </button>
    )
}

export default GameCell
