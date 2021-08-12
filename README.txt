Code explained.

createGame() - Line 240 will create an array emptyBoxes with keys(numbers) for each of the divs grabbed by the variable boxes, and will add the eventlistener click to all of them, and if clicked execute turnClick() on that element

turnClick(square) line 248 will pass an argument square which represent the div selected, and use the id of this div to check of that in emptyBoxes is still a number and not X or O.
	If it is still a number that means that boxes hasnt been used yet, and will execute the method turn(square.target.id, player1, 1) 
	.....

function turn(squareId, player, i) line 255 the squareId is the id number of the selected box, player1 is O, and i is 1 (to pass information to the object Player[1]). 
It will write the player (O or X ) in the emptyBoxes[squrareId (for example 0)] 
Will also push that id number to the Player[1] object
Write the O in the html innertext of that div.
and check if the game has been won by checkWin(emptyBoxes, player), if yes, then execute gameOver

function checkWinner(board,player) line 263. Create a variable validPlays from passing the reduce method on 'board' which in this example is the argument passed above as 'emptyBoxes' and player which in this case will be player1 (O)
The reduce method will take as arguments board.reduce((a, e, i) - The accumulator, current value(if its a number or O or X), and index of each box.
(e === player) ? a.concat(i) : a, []) which means is the current value equal to O,X ? If yes, then pass the index to the accumulator, for now say the box clicke was the first one, index 0, so plays will have the value 0.
It will also iterate through the victories array using a 'for of' loop passing two parameters for (let [index, win] of victories.entries()), index is the index and win is every array containing 3 combinations.

if (win.every(elem => validPlays.indexOf(elem) > -1)) if the sequence of numbers in validPlays is found in any array of combinations from victories. It passes the values to gameWon as an object containing the index that matched the victories array and player O or X .

function gameOver(gameWon) line 278 
will use a for of loop to iterate through the gameWon index ex 0 and iterate through each cell changing the colors. 
--- minimax

function bestSpot() line 297
will run the minimax function passing emptyboxes as arguments, and player2

function minimax(newBoard,player) line 312 newboard is emptyBoxes and player is player2 X
variable availSpots will run the emptySquares function to get only the numbers from emptyBoxes, because what is not a number is already taken by O or X
 	It will run the method checkWinner in a 'if' statement passing as arguments(newBoard, player1) newBoard is emptyBoxes, if it returns true minimax will return a score of -10.
	another 'if' statement will run checkWinner passing newBoard and player2, if it returns true, minimax will return a score of 10.

	It creates a variable moves, and starts a for loop throught the availSpots.

	Creates an empty object named move and creates a key named index and passes the newBoard or '(emptyBoxes)' first available number from availSpots to move.index (move.index = newBoard[availSpots[i]]). If we had selected the first box to O then the first available spot will be the number 1, which will be passed to move.index. Then it will assign the player, which is X to this free spot.(line 326)
	line 328 a ''if" statement checking if the player is player2, if yes then use a variable ''result' and assign to this variable the return from minimax, passing newBoard and player1 as arguments. Keep in mind that the first free spot of newBoard (emptyBoxes) has been selected and assigned to player2(X). Then it will assign the result (-10 10 or 0) to the object move in a newly created key named score. It will repeat this untill i reaches the length of availSpots. It will push to the array moves all thousands of possible combinations.

	In order to select the best move, line 342. Check if the player is player2 if so set the bestScore to -infinity ( or anyother big negative number).
	Use a for loop to iterate through the moves array, and if the key score of moves[i] is higher than - infinity this is the best move.
	Else if the player is player1 set the bestScore to infinity and do the same for loop if the score is lower than bestScore taht is the best move, since we are looking to lower the score for player1.





































