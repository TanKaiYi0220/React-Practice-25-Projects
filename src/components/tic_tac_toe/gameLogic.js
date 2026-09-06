export const EMPTY_CELL = '';
export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const BOARD_LENGTH = 9;

export const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export function createEmptyBoard() {
    return Array(BOARD_LENGTH).fill(EMPTY_CELL);
}

export function createInitialState() {
    return {
        history: [createEmptyBoard()],
        currentMove: 0,
        scores: {
            X: 0,
            O: 0,
            draws: 0
        },
        scoredResult: null
    };
}

export function getCurrentBoard(state) {
    return state.history[state.currentMove];
}

export function getNextPlayer(player) {
    return player === PLAYER_X ? PLAYER_O : PLAYER_X;
}

export function getCurrentPlayer(state) {
    return state.currentMove % 2 === 0 ? PLAYER_X : PLAYER_O;
}

export function getWinnerInfo(board) {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
        const winningCells = WINNING_PATTERNS[i];
        const [firstIndex, secondIndex, thirdIndex] = winningCells;
        const firstCell = board[firstIndex];

        if (
            firstCell !== EMPTY_CELL &&
            firstCell === board[secondIndex] &&
            firstCell === board[thirdIndex]
        ) {
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

export function getIsDraw(board) {
    return !getWinnerInfo(board) && getIsBoardFull(board);
}

export function getRoundResult(board) {
    const winnerInfo = getWinnerInfo(board);

    if (winnerInfo) {
        return {
            type: 'winner',
            winner: winnerInfo.winner,
            winningCells: winnerInfo.winningCells
        };
    }

    if (getIsDraw(board)) {
        return {
            type: 'draw'
        };
    }

    return null;
}

export function getStatusText(board, currentPlayer) {
    const roundResult = getRoundResult(board);

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
    const board = getCurrentBoard(state);
    const currentResult = getRoundResult(board);

    if (!Number.isInteger(index) || index < 0 || index >= BOARD_LENGTH) return state;
    if (currentResult || board[index] !== EMPTY_CELL) return state;

    const currentPlayer = getCurrentPlayer(state);
    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    const nextHistory = [...state.history.slice(0, state.currentMove + 1), nextBoard];
    const nextResult = getRoundResult(nextBoard);
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
    const targetResult = getRoundResult(targetBoard);
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
    return {
        ...state,
        history: [createEmptyBoard()],
        currentMove: 0,
        scoredResult: null
    };
}

export function resetMatch() {
    return createInitialState();
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
            return resetMatch();
        default:
            return state;
    }
}
