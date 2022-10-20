// Our Project Dom elements
const cells = document.querySelectorAll('.gameCell');
const gameStatus = document.querySelector('#gameStatus');
const restartButton = document.querySelector('#restartBtn');

//Our project dataStructurse
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];

// Our Boolean flags
let running = false;

// Our Project variables
let currentPlayer = 'X';

initializeGame();

// Our project Functions
function initializeGame() {
	// Intialize onclick in each game cell
	cells.forEach((cell, index) => {
		cell.addEventListener('click', () => handleCellClick(index));
		cell.childNodes[1].textContent = '';
	});
	// intialize the game status
	gameStatus.textContent = `${currentPlayer}'s turn`;
	// intialize onclick restart button
	restartButton.addEventListener('click', handleRestartClick);
	// Intialize our boolean flag that indicates if we are runnin
	running = true;
}

function handleCellClick(cellNumber) {
	//Check if her choice is valid
	if (!running) alert('Please Restart the game');
	else if (options[cellNumber] != '') alert('Invalid choice, try again!');
	else {
		//Update her choice
		updateChoice(cellNumber);
		// Check if we have winner
		winCheck();
	}
}

function updateChoice(cellNumber) {
	// Update the choice in the dom
	cells[cellNumber].childNodes[1].textContent = `${currentPlayer}`;
	// Update the choice in the options
	options[cellNumber] = currentPlayer;
}

function winCheck() {
	let haveWinner = false;
	for (let i = 0; i < winConditions.length; i++) {
		let currentOption = winConditions[i];
		let cell1 = options[currentOption[0]];
		let cell2 = options[currentOption[1]];
		let cell3 = options[currentOption[2]];
		if (cell1 === '' && cell2 === '' && cell3 === '') {
			continue;
		}
		if (cell1 == cell2 && cell2 == cell3) {
			haveWinner = true;
			colorWinningMove(currentOption[0], currentOption[1], currentOption[2]);
			break;
		}
	}
	if (haveWinner) {
		gameStatus.textContent = `${currentPlayer} win the game !`;
		gameStatus.style.color = 'red';
		running = false;
	} else if (!options.includes('')) {
		gameStatus.textContent = `Tie !`;
		running = false;
	} else {
		changePlayerTurn();
	}
}

function colorWinningMove(n1, n2, n3) {
	cells[n1].childNodes[1].style.color = 'red';
	cells[n2].childNodes[1].style.color = 'red';
	cells[n3].childNodes[1].style.color = 'red';
}

function changePlayerTurn() {
	currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
	gameStatus.textContent = `${currentPlayer}'s turn`;
}

function handleRestartClick() {
	// Clean the options array
	options = ['', '', '', '', '', '', '', '', ''];
	cells.forEach(cell => {
		cell.childNodes[1].style.color = 'black';
		cell.childNodes[1].textContent = '';
	});
	gameStatus.style.color = 'black';
	currentPlayer = 'X';
	gameStatus.textContent = `${currentPlayer}'s turn`;
	running = true;
}
