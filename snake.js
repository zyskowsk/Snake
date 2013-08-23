// node
// var _= require('./underscore')

SnakeGame = {};

SnakeGame.Snake = (function() {

	var compass = {
		north: [-1, 0],
		east: [0, 1],
		south: [1, 0],
		west: [0, -1]
	};

	function Snake() {
		this.body = [[3,3], [3,4], [3,5]];
		this.length = this.body.length;
		this.currentDirection = [0, 1];
	}

	Snake.prototype.head = function() {
		return this.body.slice(-1)[0];
	}

	Snake.prototype.turn = function(newDirection) {
		this.currentDirection = compass[newDirection];
	}

	Snake.prototype.lookAhead = function() {
		var dir = this.currentDirection;
		var nextPos = [this.head()[0] + dir[0], this.head()[1] + dir[1]];

		return nextPos;
	}

	Snake.prototype.eat = function() {
		var nextPos = this.lookAhead();
		this.body.push(nextPos);
	}

	Snake.prototype.move = function() {
		var newHead = this.lookAhead();

		this.body.shift();
		this.body.push(newHead);
	}

	return Snake;
})();

SnakeGame.Game = (function () {
	function Game(size) {
		this.board = new SnakeGame.Board(size);
		this.snake = this.board.snake;
		this.over = false;
		this.size = size;
		this.placeFood();
	}

	Game.prototype.step = function () {
		if (this.isFoodAhead()) {
			this.snake.eat();
			this.placeFood();
		} else if (this.isEndingMove(this.snake.lookAhead())) {
			this.over = true;
		} else {
			this.snake.move();
		}
	}

	Game.prototype.isEndingMove= function (pos) {
		var len = this.snake.length;
		var snake = this.snake.body;
		_.each(snake, function(sPos) {
			if ( pos[0] === sPos[0] && pos[1] === sPos[1]) {
				return true;
			}
		}); 

		return (pos[0] > 29 || pos[0] < 0 || pos[1] > 29 || pos[0] < 0);
	}

	// For ASCII rendering

	// Game.prototype.nextChar = function() {
	// 	var nextPos = this.snake.lookAhead();
	// 	console.log(nextPos);
	// 	if ((nextPos[0] === this.size) || (nextPos[0] < 0)) {
	// 		return "Off Board";
	// 	} else {
	// 		return this.board.board[nextPos[0]][nextPos[1]];
	// 	}
	// }

	Game.prototype.isFoodAhead = function () {
		var food = this.currentFoodPos;
		var nextPos = this.snake.lookAhead();
		return (food[0] === nextPos[0] && food[1] === nextPos[1]);
	}

	Game.prototype.placeFood = function() {
		var openSpaces = this.board.openSpaces(),
			  len = openSpaces.length,
			  randomIndex = Math.floor(Math.random() * len);
			  
		this.currentFoodPos = openSpaces[randomIndex];
	}

 
	Game.prototype.render = function () {
		return this.board.render();
	}

	return Game;
})();

SnakeGame.Board = (function () {

	function Board(size) {
		this.size = size;
		this.snake = new SnakeGame.Snake;
		// this.cleanBoard();
		// this.placeFood();
	}

	// Board.prototype.cleanBoard = function() {
	// 	var that = this,
	// 		  board = [];

 // 		_.times(that.size, function(i) {
	// 		board.push([]);
	// 		_.times(that.size, function() {
	// 			board[i].push("  ");
	// 		});
	// 	});

	// 	this.board = board;
	// }

	Board.prototype.openSpaces = function() {
		var that = this;
		var size = this.size;
		var allSpaces = [];
		_.times(size, function(i) {
			_.times(size, function(j) {
				allSpaces.push([i,j]);
			});
		});

		openSpaces = _.reject(allSpaces, function(pos) {
			var x = pos[0],
					y = pos[1];

			var isTaken = function() {
				var isTaken = false
				_.times(that.snake.length, function(i) {
					if( x === that.snake.body[i][0] &&
						  	y === that.snake.body[i][1] ) {
						isTaken = true;
					} 
				});
				return isTaken;
			};

			return isTaken();
		});

		return openSpaces;
	}

	// ASCII render

	// Board.prototype.render = function() {
	// 	var randX = this.currentFoodPos[0],
	// 			randY = this.currentFoodPos[1];

	// 	this.cleanBoard();
	// 	this.board[randX][randY] = 'F ';
	// 	this.drawSnake();

	// 	var boardString = " "
	// 	_.times((this.board[0].length) * 2, function() { boardString += "-" });

	// 	boardString += '\n';

	// 	_.each(this.board, function(row) {
	// 		boardString += '|'

	// 		_.each(row, function(elem) {
	// 			boardString += elem;
	// 		});

	// 		boardString += '|\n'
	// 	});

	// 	boardString += " ";
	// 	_.times((this.board[0].length) * 2, function() { boardString += "-" });
	// 	boardString += '\n';


		
	// 	return boardString;
	// }

		// Board.prototype.drawSnake = function() {
	// 	var that = this,
	// 		  len = this.snake.length,
	// 		  body = this.snake.body;

	// 	_.each(body, function(pos) {
	// 		var x = pos[0],
	// 				y = pos[1];
	// 		that.board[x][y] = "* ";
	// 	});
	// }


	return Board
})();

