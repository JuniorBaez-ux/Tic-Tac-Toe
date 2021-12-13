const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector("[ data-winning-message-text]");
const NamesBtn = document.getElementById("btnNames");
const btnRestartGame = document.getElementById("btnRestart");
let circleTurn
let player1 = "";
let player2 = "";


startGame();

restartButton.addEventListener("click", () => {
    startGame();
    clearTurn();
    displayButton();
})

btnRestartGame.addEventListener("click", () => {
    startGame();
    clearTurn();
    displayButton();
})

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}
    

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageElement.innerText = "Draw!";
    } else {
       winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
    displayCurrentPlayer(player1, player2);
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function openForm() {
    document.getElementById("Names").style.display = "flex";
}

function closeForm() {
    document.getElementById("Names").style.display = "none";
    clearNames();
}

NamesBtn.addEventListener("click", function(e) {
    openForm();
});

function addPlayersName() {
    try {
        player1 = document.getElementById("player1").value;
        player2 = document.getElementById("player2").value;
        if (player1 === "" || player2 === "") {
            throw "Please fill in all the fields"
        }
        else{
            closeForm();
            displayCurrentPlayer(player1, player2);
            clearNames();
            closeButton();
        }
    } catch (error) {
        alert("Please fill in all the fields");
    }
}

function displayCurrentPlayer(player1, player2) {
    if(circleTurn) {
        document.getElementById("playerTurn").innerHTML = player1 + " it is your turn";
    } else {
        document.getElementById("playerTurn").innerHTML = player2 + " it is your turn";
    }
}

function clearTurn() {
    document.getElementById("playerTurn").innerHTML = "";
}

function clearNames() {
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
}

function closeButton(){
    document.getElementById("btnNames").style.display = "none"
}

function displayButton(){
    document.getElementById("btnNames").style.display = "flex"
}