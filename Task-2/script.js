const cells = Array.from(document.querySelectorAll(".cell"));
const message = document.querySelector("#message");
const turnBadge = document.querySelector("#turnBadge");
const humanScore = document.querySelector("#humanScore");
const aiScore = document.querySelector("#aiScore");
const drawScore = document.querySelector("#drawScore");
const newRoundButton = document.querySelector("#newRound");
const resetAllButton = document.querySelector("#resetAll");
const symbolButtons = Array.from(document.querySelectorAll("[data-symbol]"));
const difficultyButtons = Array.from(document.querySelectorAll("[data-level]"));

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let board = Array(9).fill("");
let human = "X";
let ai = "O";
let difficulty = "unbeatable";
let gameOver = false;
let scores = {
    human: 0,
    ai: 0,
    draw: 0,
};

function startRound() {
    board = Array(9).fill("");
    gameOver = false;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("ai", "win", "placed");
        cell.querySelectorAll(".block-burst").forEach((burst) => burst.remove());
    });
    document.body.classList.remove("ai-thinking");
    setMessage(human === "X" ? "Your turn. Choose a square." : "AI starts because you selected O.");

    if (human === "O") {
        window.setTimeout(makeAiMove, 350);
    }
}

function setMessage(text) {
    message.textContent = text;
    turnBadge.textContent = text.includes("AI") ? "AI Thinking" : gameOver ? "Round Over" : "Your Turn";
}

function handleHumanMove(index) {
    if (gameOver || board[index]) {
        return;
    }

    placeMove(index, human);

    if (finishIfNeeded()) {
        return;
    }

    setMessage("AI is thinking...");
    document.body.classList.add("ai-thinking");
    window.setTimeout(makeAiMove, 350);
}

function makeAiMove() {
    if (gameOver) {
        return;
    }

    const move = chooseAiMove();
    placeMove(move, ai);
    document.body.classList.remove("ai-thinking");

    if (!finishIfNeeded()) {
        setMessage("Your turn. Choose your next move.");
    }
}

function placeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].disabled = true;
    cells[index].classList.remove("placed");
    void cells[index].offsetWidth;
    cells[index].classList.add("placed");
    createMoveBurst(cells[index]);

    if (player === ai) {
        cells[index].classList.add("ai");
    }
}

function createMoveBurst(cell) {
    const burstPoints = [
        [-42, -36],
        [38, -34],
        [-36, 34],
        [42, 30],
        [0, -48],
        [0, 46],
    ];

    burstPoints.forEach(([x, y]) => {
        const burst = document.createElement("span");
        burst.className = "block-burst";
        burst.style.left = "50%";
        burst.style.top = "50%";
        burst.style.setProperty("--burst-x", `${x}px`);
        burst.style.setProperty("--burst-y", `${y}px`);
        cell.appendChild(burst);
        window.setTimeout(() => burst.remove(), 560);
    });
}

function finishIfNeeded() {
    const result = getResult(board);

    if (!result) {
        return false;
    }

    gameOver = true;
    cells.forEach((cell) => {
        cell.disabled = true;
    });

    if (result.winner) {
        result.line.forEach((index) => cells[index].classList.add("win"));
    }

    if (result.winner === human) {
        scores.human += 1;
        setMessage("You win this round.");
    } else if (result.winner === ai) {
        scores.ai += 1;
        setMessage("AI wins this round.");
    } else {
        scores.draw += 1;
        setMessage("It is a draw. Perfect play often ends this way.");
    }

    updateScoreboard();
    return true;
}

function updateScoreboard() {
    humanScore.textContent = scores.human;
    aiScore.textContent = scores.ai;
    drawScore.textContent = scores.draw;
}

function getResult(currentBoard) {
    for (const line of winningLines) {
        const [a, b, c] = line;

        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return {
                winner: currentBoard[a],
                line,
            };
        }
    }

    if (currentBoard.every(Boolean)) {
        return {
            winner: "draw",
            line: [],
        };
    }

    return null;
}

function chooseAiMove() {
    const availableMoves = getAvailableMoves(board);

    if (difficulty === "easy") {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (difficulty === "smart" && Math.random() < 0.35) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    return getBestMove();
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (const move of getAvailableMoves(board)) {
        board[move] = ai;
        const score = minimax(board, 0, false, -Infinity, Infinity);
        board[move] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

function minimax(currentBoard, depth, isMaximizing, alpha, beta) {
    const result = getResult(currentBoard);

    if (result) {
        if (result.winner === ai) {
            return 10 - depth;
        }

        if (result.winner === human) {
            return depth - 10;
        }

        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (const move of getAvailableMoves(currentBoard)) {
            currentBoard[move] = ai;
            const score = minimax(currentBoard, depth + 1, false, alpha, beta);
            currentBoard[move] = "";
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);

            if (beta <= alpha) {
                break;
            }
        }

        return bestScore;
    }

    let bestScore = Infinity;

    for (const move of getAvailableMoves(currentBoard)) {
        currentBoard[move] = human;
        const score = minimax(currentBoard, depth + 1, true, alpha, beta);
        currentBoard[move] = "";
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);

        if (beta <= alpha) {
            break;
        }
    }

    return bestScore;
}

function getAvailableMoves(currentBoard) {
    return currentBoard
        .map((value, index) => (value ? null : index))
        .filter((value) => value !== null);
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => handleHumanMove(Number(cell.dataset.index)));
});

symbolButtons.forEach((button) => {
    button.addEventListener("click", () => {
        symbolButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        human = button.dataset.symbol;
        ai = human === "X" ? "O" : "X";
        startRound();
    });
});

difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        difficultyButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        difficulty = button.dataset.level;
        startRound();
    });
});

newRoundButton.addEventListener("click", startRound);

resetAllButton.addEventListener("click", () => {
    scores = {
        human: 0,
        ai: 0,
        draw: 0,
    };
    updateScoreboard();
    startRound();
});

startRound();
