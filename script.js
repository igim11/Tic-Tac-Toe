const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const xBtn = document.getElementById('x-player');
const oBtn = document.getElementById('o-player');
let currentMove = 0;
let moveHistory = [];

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","","",];
let running = false; 

chooseplayer();

function chooseplayer() {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    xBtn.addEventListener("click", function() {
        currentPlayer = "X";
        statusText.textContent = currentPlayer + ' turn';
        intializedGame();

    });
    oBtn.addEventListener("click", function () {
        currentPlayer = "O";
        statusText.textContent = currentPlayer + ' turn';
        intializedGame();

    });
}


function changePlayer () {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = currentPlayer + ' turn';
}

function intializedGame(){
    chooseplayer();
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
    nextBtn.addEventListener('click', nextMove);
    prevBtn.addEventListener('click', prevMove);
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
}

function renderNextPrev() {
    
    if (currentMove >= moveHistory.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }

    if (currentMove <= 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
}


function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) {
        return;
    }

    saveMove(cellIndex);
    updateCell(this, cellIndex);
    renderNextPrev();
    checkWinner();
    
}

function saveMove(index) {
    const move = {index, currentPlayer};
    moveHistory.push(move);
    currentMove = moveHistory.length - 1;
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function checkWinner () {
    let roundWon = false; 

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true; 
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = currentPlayer + ' wins';
        running = false;
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
    }
    else if(!options.includes("")) {
        statusText.textContent = 'Draw!';
        running = false;
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
    }
    else {
        changePlayer();
    }

}

function restartGame () {
    statusText.textContent = "";
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    options = ["","","","","","","","","",];
    cells.forEach(cell => cell.textContent = "");
    running = false;
    moveHistory = [];
    currentMove = 0;
}

function nextMove () {
    if (currentMove < moveHistory.length - 1) {
        currentMove++;
        const {index, currentPlayer} = moveHistory[currentMove];
        cells[index].textContent = currentPlayer;
        renderNextPrev();
    }
}

function prevMove () {
    if (currentMove > 0) {
        const {index} = moveHistory[currentMove];
        cells[index].textContent = "";
        currentMove--;
        renderNextPrev();
    }
}

