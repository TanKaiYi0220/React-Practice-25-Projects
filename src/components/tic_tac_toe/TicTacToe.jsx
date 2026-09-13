import React, { useReducer } from 'react'
import GameBoard from './GameBoard'
import GameStatus from './GameStatus'
import GameModeSelector from './GameModeSelector'
import ScoreBoard from './ScoreBoard'
import MoveHistory from './MoveHistory'
import {
    GAME_MODE_OPTIONS,
    createDefaultState,
    gameReducer,
    getCurrentBoard,
    getCurrentGameMode,
    getCurrentPlayer,
    getRoundResult,
    getStatusText
} from './gameLogic'
import "./style.css"

const TicTacToe = () => {
    const [gameState, dispatch] = useReducer(gameReducer, undefined, createDefaultState)

    const gameMode = getCurrentGameMode(gameState);
    const board = getCurrentBoard(gameState);
    const currentPlayer = getCurrentPlayer(gameState);
    const roundResult = getRoundResult(board, gameState.modeId);
    const statusText = getStatusText(board, currentPlayer, gameState.modeId);
    const winningCells = roundResult?.winningCells || [];
    const isGameOver = Boolean(roundResult);

    function handleCellClicked(index) {
        dispatch({ type: 'play', index });
    }

    function handleJumpToMove(moveIndex) {
        dispatch({ type: 'jumpToMove', moveIndex });
    }

    function handleRestartRound() {
        dispatch({ type: 'restartRound' });
    }

    function handleResetMatch() {
        dispatch({ type: 'resetMatch' });
    }

    function handleChangeMode(modeId) {
        dispatch({ type: 'changeMode', modeId });
    }

    return (
        <div className="gameContainer">
            <div className="gamePanel">
                <div className="gameHeader">
                    <p className="gameEyebrow">React Game Architecture</p>
                    <h1>Tic Tac Toe</h1>
                    <p className="gameDescription">
                        A small game built with pure logic functions, a reducer, reusable board cells, scores, and move history.
                    </p>
                </div>

                <GameModeSelector
                    modes={GAME_MODE_OPTIONS}
                    selectedModeId={gameState.modeId}
                    onChangeMode={handleChangeMode}
                />

                <div className="gameLayout">
                    <main className="playArea">
                        <GameStatus
                            statusText={statusText}
                            currentPlayer={currentPlayer}
                            roundResult={roundResult}
                        />

                        <GameBoard
                            board={board}
                            gameMode={gameMode}
                            winningCells={winningCells}
                            isGameOver={isGameOver}
                            onPlay={handleCellClicked}
                        />

                        <div className="gameActions">
                            <button className="restartButton primaryAction" onClick={handleRestartRound}>
                                New Round
                            </button>
                            <button className="restartButton secondaryAction" onClick={handleResetMatch}>
                                Reset Match
                            </button>
                        </div>
                    </main>

                    <aside className="gameSidebar">
                        <ScoreBoard scores={gameState.scores} />
                        <MoveHistory
                            history={gameState.history}
                            currentMove={gameState.currentMove}
                            onJumpToMove={handleJumpToMove}
                        />
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default TicTacToe