import React, { useEffect, useState } from 'react'
import "./style.css"

function Square({ index, squares, handleClicked }) {
    return <button
        onClick={() => { handleClicked(index) }}
        className="gameCell">
        {squares[index]}
    </button>
}

const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [isXPlayer, setIsXPlayer] = useState(true);
    const [status, setStatus] = useState("");

    function getWinner(squares) {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
        ];

        for (let i = 0; i < winningPatterns.length; i++) {
            const [x, y, z] = winningPatterns[i];
            if (squares[x] && squares[x] == squares[y] && squares[y] == squares[z]) {
                return squares[x];
            }
        }

        return null;
    }

    function ToPlayerString(playerFlag){
        return (playerFlag) ? "X" : "O";
    }

    function handleCellClicked(getCurrentIndex) {
        let squaresClone = [...squares];

        if (getWinner(squares) || squaresClone[getCurrentIndex] != "") return;

        squaresClone[getCurrentIndex] = ToPlayerString(isXPlayer);
        setSquares(squaresClone);
        setIsXPlayer(!isXPlayer);
    }

    function handleRestartButton() {
        setIsXPlayer(true);
        setSquares(Array(9).fill(""));
    }



    useEffect(() => {
        if (!getWinner(squares) && squares.every((item) => item != "")) {
            setStatus("Draw")
        } else if (getWinner(squares)) {
            setStatus(`Winner is ${getWinner(squares)}`);
        } else {
            setStatus(`Next player is ${ToPlayerString(isXPlayer)}`)
        }
    }, [squares, isXPlayer])

    return (
        <div className="gameContainer">
            TicTacToe
            <div className="gameBoard">
                <div className="gameRow">
                    <Square index={0} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={1} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={2} squares={squares} handleClicked={handleCellClicked} />
                </div>
                <div className="gameRow">
                    <Square index={3} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={4} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={5} squares={squares} handleClicked={handleCellClicked} />
                </div>
                <div className="gameRow">
                    <Square index={6} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={7} squares={squares} handleClicked={handleCellClicked} />
                    <Square index={8} squares={squares} handleClicked={handleCellClicked} />
                </div>
            </div>
            <div className="gameStatus">
                <h1 className="status">{status}</h1>
                <button className="restartButton" onClick={() => { handleRestartButton() }}>Restart</button>
            </div>
        </div>
    )
}

export default TicTacToe