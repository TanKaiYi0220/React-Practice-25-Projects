import React from 'react'

function getMoveText(moveIndex) {
    return moveIndex === 0 ? 'Start' : `Move ${moveIndex}`;
}

function getMoveDescription(moveIndex) {
    if (moveIndex === 0) return 'Empty board';
    return `After ${moveIndex} turn${moveIndex > 1 ? 's' : ''}`;
}

const MoveHistory = ({ history, currentMove, onJumpToMove }) => {
    return (
        <section className="moveHistory">
            <div className="sidebarHeader">
                <p>Timeline</p>
                <h2>Move History</h2>
            </div>

            <div className="moveList">
                {
                    history.map((_, moveIndex) => (
                        <button
                            key={moveIndex}
                            className={`moveButton ${currentMove === moveIndex ? 'activeMove' : ''}`}
                            disabled={currentMove === moveIndex}
                            onClick={() => { onJumpToMove(moveIndex) }}>
                            <span>{getMoveText(moveIndex)}</span>
                            <small>{getMoveDescription(moveIndex)}</small>
                        </button>
                    ))
                }
            </div>
        </section>
    )
}

export default MoveHistory

