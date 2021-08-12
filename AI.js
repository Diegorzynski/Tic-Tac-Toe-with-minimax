const headText = document.getElementById('headText')
const boxes = document.getElementsByClassName('box');
const Reset = document.getElementById('Reset')

var emptyBoxes;
const player1 = 'O';
const player2 = 'X';
const victories = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const positions = {
    1: "Top",
    2: "Mid",
    3: "Bottom",
    4: "Right",
    5: "Mid",
    6: "Left",
    7: "Diagonal",
    8: "Diagonal"
}

var Player = {
    1: [],
    2: []
};


createGame();
Restart();

function createGame() {
	
	emptyBoxes = Array.from(Array(9).keys());
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof emptyBoxes[square.target.id] == 'number') {
		turn(square.target.id, player1, 1)
		if (!checkWinner(emptyBoxes, player1) && !checkTie()) turn(bestSpot(), player2, 2);
	}
}

function turn(squareId, currentPlayer, i) {
	emptyBoxes[squareId] = currentPlayer;
    Player[i].push(squareId)
	document.getElementById(squareId).innerText = currentPlayer;
	let gameWon = checkWinner(emptyBoxes, currentPlayer)
	if (gameWon) gameOver(gameWon)
}

function checkWinner(board, currentPlayer) {
	let validPlays = board.reduce((acc, el, ind) =>
		(el === currentPlayer) ? acc.concat(ind) : acc, []);
		//console.log(validPlays)
	let gameWon = null;
	for (let [index, win] of victories.entries()) {
		if (win.every(elem => validPlays.indexOf(elem) > -1)) {
			gameWon = {index: index, currentPlayer: currentPlayer};
			//console.log(gameWon)
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of victories[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.currentPlayer == player1 ? "blue" : "red";
	}
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.currentPlayer == player1 ? "You win!" : "You lose.");
}

function declareWinner(winner) {
	headText.innerText = winner;
}

function emptySquares() {
	return emptyBoxes.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(emptyBoxes, player2).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, currentPlayer) {
	var availSpots = emptySquares();

	if (checkWinner(newBoard, player1)) {
		return {score: -10};
	} else if (checkWinner(newBoard, player2)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = currentPlayer;

		if (currentPlayer == player2) {
			var result = minimax(newBoard, player1);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, player2);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
		//console.log(moves)
	}

	var bestMove;
	if(currentPlayer === player2) {
		var bestScore = -Infinity;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = Infinity;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

function Restart() {
	    Reset.addEventListener('click', function(){
	        headText.style.color = "#3e0249"
		for(i = 0; i < boxes.length; i++){
			document.getElementById(`${i}`).innerText = "";
			document.getElementById(`${i}`).style.backgroundColor = '#fff'
		}
	            Player = {
	                1: [],
	                2: []
	            }
	            currentPlayer = player1;
	            headText.innerText = "Let's play again!"
	            setTimeout(() => {
	                headText.innerText = "You start"},1500);
				createGame()
	        })
	   }; 
	

