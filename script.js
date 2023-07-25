const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
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
let currentPlayer = "X";
let running = false; 

intializedGame();

function intializedGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = currentPlayer + ' turn';
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

function choosePlayer () {
    //when game starts make player choose who will go first 
    
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

function changePlayer () {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = currentPlayer + ' turn';
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
    currentPlayer = "X";
    options = ["","","","","","","","","",];
    statusText.textContent = currentPlayer + 'turn';
    cells.forEach(cell => cell.textContent = "");
    running = true;
    moveHistory = [];
    currentMove = 0;
    intializedGame();
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

