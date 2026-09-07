import React, { useReducer } from 'react'
import GameBoard from './GameBoard'
import GameStatus from './GameStatus'
import ScoreBoard from './ScoreBoard'
import MoveHistory from './MoveHistory'
import {
    createInitialState,
    gameReducer,
    getCurrentPlayer,
    getCurrentBoard,
    getRoundResult,
    getStatusText,
    getGridSize,
} from "./gameLogic"
import "./style.css"

const TicTacToe = () => {
    const [gameState, dispatch] = useReducer(gameReducer, undefined, createInitialState)

    const board = getCurrentBoard(gameState);
    const currentPlayer = getCurrentPlayer(gameState);
    const roundResult = getRoundResult(board);
    const statusText = getStatusText(board, currentPlayer);
    const winningCells = roundResult?.winningCells || [];
    const isGameOver = Boolean(roundResult);
    const gridSize = getGridSize();

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

    function handle3X3Game(){
        dispatch({type: 'create3X3'});
    }
    
    function handle4X4Game(){
        dispatch({type: 'create4X4'});
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

                <div className="gameMode">
                    <button onClick={() => {handle3X3Game()}} className="game3X3Button">3x3</button>
                    <button onClick={() => {handle4X4Game()}} className="game4X4Button">4x4</button>
                </div>

                <div className="gameLayout">
                    <main className="playArea">
                        <GameStatus
                            statusText={statusText}
                            currentPlayer={currentPlayer}
                            roundResult={roundResult}
                        />

                        <GameBoard
                            board={board}
                            gridSize={gridSize}
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