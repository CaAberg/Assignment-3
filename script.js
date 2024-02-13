$(document).ready(function() {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    let gamesPlayed = 0;
    let draws = 0;
    let xWins = 0;
    let oWins = 0;

    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    function startGame() {
        gameActive = true;
        $('#message').text('');
        $('#replay-btn').hide();
        renderBoard();
        $('#start-btn').hide(); // Hide the start button after clicking
    }

    function renderBoard() {
        $('#board').empty();
        for (let i = 0; i < board.length; i++) {
            $('#board').append(`<div class="cell" data-index="${i}">${board[i]}</div>`);
        }
        $('.cell').off('click').click(cellClicked);
    }

    function cellClicked() {
        const index = $(this).data('index');
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            renderBoard();
            if (checkWin(currentPlayer)) {
                $('#message').text(`Player ${currentPlayer} wins!`);
                updateStats(currentPlayer, 'win');
                endGame();
            } else if (board.every(cell => cell !== '')) {
                $('#message').text('It\'s a draw!');
                updateStats('', 'draw');
                endGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin(player) {
        return WINNING_COMBINATIONS.some(combination =>
            combination.every(index => board[index] === player)
        );
    }

    function endGame() {
        gameActive = false;
        $('#replay-btn').show();
        gamesPlayed++;
        $('#games-played').text(gamesPlayed);
    }

    function updateStats(player, result) {
        if (result === 'win') {
            if (player === 'X') {
                xWins++;
            } else {
                oWins++;
            }
        } else if (result === 'draw') {
            draws++;
        }
        $('#x-wins').text(xWins);
        $('#o-wins').text(oWins);
        $('#draws').text(draws);
    }

    $('#start-btn').click(startGame);

    $('#replay-btn').click(function() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        $('#message').text('');
        renderBoard();
    });
});

