export const EMPTY_CELL = '';
export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const DEFAULT_GAME_MODE_ID = 'threeByThree';

export const GAME_MODES = {
    threeByThree: {
        id: 'threeByThree',
        label: '3 x 3',
        boardSize: 3,
        winLength: 3
    },
    fourByFour: {
        id: 'fourByFour',
        label: '4 x 4',
        boardSize: 4,
        winLength: 4
    }
};

export const GAME_MODE_OPTIONS = Object.values(GAME_MODES);

export function getGameMode(modeId) {
    const gameMode = GAME_MODES[modeId];

    if (!gameMode) {
        throw new Error(`Unknown game mode: ${modeId}`);
    }

    return gameMode;
}

export function getCellCount(gameMode) {
    return gameMode.boardSize * gameMode.boardSize;
}

export function createEmptyBoard(gameMode) {
    return Array(getCellCount(gameMode)).fill(EMPTY_CELL);
}

export function createEmptyScores() {
    return {
        X: 0,
        O: 0,
        draws: 0
    };
}

export function createInitialState(modeId) {
    const gameMode = getGameMode(modeId);

    return {
        modeId: gameMode.id,
        history: [createEmptyBoard(gameMode)],
        currentMove: 0,
        scores: createEmptyScores(),
        scoredResult: null
    };
}

export function createDefaultState() {
    return createInitialState(DEFAULT_GAME_MODE_ID);
}

export function getCurrentBoard(state) {
    return state.history[state.currentMove];
}

export function getCurrentGameMode(state) {
    return getGameMode(state.modeId);
}

export function getCurrentPlayer(state) {
    return state.currentMove % 2 === 0 ? PLAYER_X : PLAYER_O;
}

export function getBoardIndex(rowIndex, columnIndex, boardSize) {
    return rowIndex * boardSize + columnIndex;
}

export function isInsideBoard(rowIndex, columnIndex, boardSize) {
    return (
        rowIndex >= 0 &&
        rowIndex < boardSize &&
        columnIndex >= 0 &&
        columnIndex < boardSize
    );
}

export function createWinningPatterns(boardSize, winLength) {
    const directions = [
        { rowStep: 0, columnStep: 1 },
        { rowStep: 1, columnStep: 0 },
        { rowStep: 1, columnStep: 1 },
        { rowStep: 1, columnStep: -1 }
    ];

    const patterns = [];

    for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
        const { rowStep, columnStep } = directions[directionIndex];

        for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
            for (let columnIndex = 0; columnIndex < boardSize; columnIndex++) {
                const endRowIndex = rowIndex + rowStep * (winLength - 1);
                const endColumnIndex = columnIndex + columnStep * (winLength - 1);

                if (!isInsideBoard(endRowIndex, endColumnIndex, boardSize)) continue;

                const pattern = [];

                for (let offset = 0; offset < winLength; offset++) {
                    const nextRowIndex = rowIndex + rowStep * offset;
                    const nextColumnIndex = columnIndex + columnStep * offset;
                    pattern.push(getBoardIndex(nextRowIndex, nextColumnIndex, boardSize));
                }

                patterns.push(pattern);
            }
        }
    }

    return patterns;
}

export function getWinnerInfo(board, modeId) {
    const gameMode = getGameMode(modeId);
    const winningPatterns = createWinningPatterns(gameMode.boardSize, gameMode.winLength);

    for (let i = 0; i < winningPatterns.length; i++) {
        const winningCells = winningPatterns[i];
        const firstCell = board[winningCells[0]];

        if (firstCell === EMPTY_CELL) continue;

        const hasWinningLine = winningCells.every((cellIndex) => board[cellIndex] === firstCell);

        if (hasWinningLine) {
            return {
                winner: firstCell,
                winningCells
            };
        }
    }

    return null;
}

export function getIsBoardFull(board) {
    return board.every((cell) => cell !== EMPTY_CELL);
}

export function getIsDraw(board, modeId) {
    return !getWinnerInfo(board, modeId) && getIsBoardFull(board);
}

export function getRoundResult(board, modeId) {
    const winnerInfo = getWinnerInfo(board, modeId);

    if (winnerInfo) {
        return {
            type: 'winner',
            winner: winnerInfo.winner,
            winningCells: winnerInfo.winningCells
        };
    }

    if (getIsDraw(board, modeId)) {
        return {
            type: 'draw'
        };
    }

    return null;
}

export function getStatusText(board, currentPlayer, modeId) {
    const roundResult = getRoundResult(board, modeId);

    if (roundResult?.type === 'winner') {
        return `${roundResult.winner} wins this round`;
    }

    if (roundResult?.type === 'draw') {
        return 'Round ended in a draw';
    }

    return `Next player is ${currentPlayer}`;
}

export function addScore(scores, roundResult) {
    if (!roundResult) return scores;

    if (roundResult.type === 'draw') {
        return {
            ...scores,
            draws: scores.draws + 1
        };
    }

    return {
        ...scores,
        [roundResult.winner]: scores[roundResult.winner] + 1
    };
}

export function removeScore(scores, roundResult) {
    if (!roundResult) return scores;

    if (roundResult.type === 'draw') {
        return {
            ...scores,
            draws: Math.max(0, scores.draws - 1)
        };
    }

    return {
        ...scores,
        [roundResult.winner]: Math.max(0, scores[roundResult.winner] - 1)
    };
}

export function applyMove(state, index) {
    const gameMode = getCurrentGameMode(state);
    const board = getCurrentBoard(state);
    const currentResult = getRoundResult(board, state.modeId);

    if (!Number.isInteger(index) || index < 0 || index >= getCellCount(gameMode)) return state;
    if (currentResult || board[index] !== EMPTY_CELL) return state;

    const currentPlayer = getCurrentPlayer(state);
    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    const nextHistory = [...state.history.slice(0, state.currentMove + 1), nextBoard];
    const nextResult = getRoundResult(nextBoard, state.modeId);
    const nextScores = nextResult ? addScore(state.scores, nextResult) : state.scores;

    return {
        ...state,
        history: nextHistory,
        currentMove: nextHistory.length - 1,
        scores: nextScores,
        scoredResult: nextResult
    };
}

export function jumpToMove(state, moveIndex) {
    if (!Number.isInteger(moveIndex) || moveIndex < 0 || moveIndex >= state.history.length) {
        return state;
    }

    const targetBoard = state.history[moveIndex];
    const targetResult = getRoundResult(targetBoard, state.modeId);
    const scoresWithoutCurrentResult = state.scoredResult
        ? removeScore(state.scores, state.scoredResult)
        : state.scores;
    const nextScores = targetResult
        ? addScore(scoresWithoutCurrentResult, targetResult)
        : scoresWithoutCurrentResult;

    return {
        ...state,
        currentMove: moveIndex,
        scores: nextScores,
        scoredResult: targetResult
    };
}

export function restartRound(state) {
    const gameMode = getCurrentGameMode(state);

    return {
        ...state,
        history: [createEmptyBoard(gameMode)],
        currentMove: 0,
        scoredResult: null
    };
}

export function resetMatch(state) {
    return createInitialState(state.modeId);
}

export function changeMode(state, modeId) {
    const gameMode = getGameMode(modeId);

    if (state.modeId === gameMode.id) return state;

    return createInitialState(gameMode.id);
}

export function gameReducer(state, action) {
    switch (action.type) {
        case 'play':
            return applyMove(state, action.index);
        case 'jumpToMove':
            return jumpToMove(state, action.moveIndex);
        case 'restartRound':
            return restartRound(state);
        case 'resetMatch':
            return resetMatch(state);
        case 'changeMode':
            return changeMode(state, action.modeId);
        default:
            return state;
    }
}
