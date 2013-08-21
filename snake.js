var _= require('./underscore')

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

SnakeGame.Game = (function() {
	function Game(size) {
		this.board = new SnakeGame.Board(size);
		this.snake = this.board.snake;
	}

	Game.prototype.step = function() {

		if (this.nextChar() === "F ") {
			this.snake.eat();
			this.board.placeFood();
		} else if (this.nextChar() != "  ") {
			console.log("Game Over");
		} else {
			this.snake.move();
		}
	}

	Game.prototype.nextChar = function() {
		var nextPos = this.snake.lookAhead();
		return this.board.board[nextPos[0]][nextPos[1]];
	}

	Game.prototype.isFoodAhead = function() {
		return nextChar() === "F "
	}

 
	Game.prototype.render = function() {
		return this.board.render();
	}

	return Game;
})();

SnakeGame.Board = (function() {

	function Board(size) {
		this.size = size;
		this.snake = new SnakeGame.Snake;
		this.cleanBoard();
		this.placeFood();
	}

	Board.prototype.drawSnake = function() {
		var that = this,
			  len = this.snake.length,
			  body = this.snake.body;

		_.each(body, function(pos) {
			var x = pos[0],
					y = pos[1];
			that.board[x][y] = "* ";
		});
	}

	Board.prototype.cleanBoard = function() {
		var that = this,
			  board = [];

 		_.times(that.size, function(i) {
			board.push([]);
			_.times(that.size, function() {
				board[i].push("  ");
			});
		});

		this.board = board;
	}

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

	Board.prototype.placeFood = function() {
		var openSpaces = this.openSpaces(),
			  len = openSpaces.length,
			  randomIndex = Math.floor(Math.random() * len);
			  
		this.currentFoodPos = openSpaces[randomIndex];
	}

	Board.prototype.render = function() {
		var randX = this.currentFoodPos[0],
				randY = this.currentFoodPos[1];

		this.cleanBoard();
		this.board[randX][randY] = 'F ';
		this.drawSnake();

		var boardString = " "
		_.times((this.board[0].length) * 2, function() { boardString += "-" });

		boardString += '\n';

		_.each(this.board, function(row) {
			boardString += '|'

			_.each(row, function(elem) {
				boardString += elem;
			});

			boardString += '|\n'
		});

		boardString += " ";
		_.times((this.board[0].length) * 2, function() { boardString += "-" });
		boardString += '\n';


		
		return boardString.toString();
	}

	return Board
})();

// Test

// var game = new SnakeGame.Game(8);
// var snake = game.snake;
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// snake.turn("south");
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// snake.turn("west");
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// snake.turn("north");
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();
// console.log(game.render());
// game.step();


