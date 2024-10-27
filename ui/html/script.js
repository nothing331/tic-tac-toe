document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.querySelector('.status-message');
    const restartButton = document.querySelector('.restart-button');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6]  // Diagonals
    ];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    statusMessage.textContent = currentPlayerTurn();

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = currentPlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];
            const a = gameState[condition[0]];
            const b = gameState[condition[1]];
            const c = gameState[condition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusMessage.textContent = winningMessage();
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusMessage.textContent = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusMessage.textContent = currentPlayerTurn();
        cells.forEach(cell => cell.textContent = "");
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});
