import React from 'react'

function getStatusMarkerText(currentPlayer, roundResult) {
    if (roundResult?.type === 'draw') return 'Draw';
    if (roundResult?.type === 'winner') return roundResult.winner;
    return currentPlayer;
}

function getStatusMarkerClassName(markerText) {
    if (markerText === 'X') return 'statusMarker xMarker';
    if (markerText === 'O') return 'statusMarker oMarker';
    return 'statusMarker drawMarker';
}

const GameStatus = ({ statusText, currentPlayer, roundResult }) => {
    const markerText = getStatusMarkerText(currentPlayer, roundResult);
    const statusClassName = roundResult ? 'gameStatus finishedStatus' : 'gameStatus';

    return (
        <section className={statusClassName}>
            <span className={getStatusMarkerClassName(markerText)}>{markerText}</span>
            <div>
                <p className="statusLabel">Round Status</p>
                <h2 className="status">{statusText}</h2>
            </div>
        </section>
    )
}

export default GameStatus
