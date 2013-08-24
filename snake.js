
SnakeGame = {};

SnakeGame.Snake = (function() {

	var COMPASS = {
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
		this.currentDirection = COMPASS[newDirection];
	}

	Snake.prototype.lookAhead = function() {
		var dir = this.currentDirection;
		var nextPos = [this.head()[0] + dir[0], this.head()[1] + dir[1]];

		return nextPos;
	}

	Snake.prototype.isOppositeDirection = function(direction) {
		return ((COMPASS[direction][0] === this.currentDirection[0]) ||
					   (COMPASS[direction][1] === this.currentDirection[1]));
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
		var isSnakePiece = false
		var len = this.snake.length;
		var snake = this.snake.body;
		_.each(snake, function(sPos) {
			if ( pos[0] === sPos[0] && pos[1] === sPos[1]) {
				isSnakePiece = true;
			}
		}); 

		var isOffBoard = (pos[0] >= this.board.size || pos[0] < 0 || 
												pos[1] >= this.board.size || pos[1] < 0)

		return isOffBoard || isSnakePiece;
	}

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
	}

	Board.prototype.openSpaces = function() {
		var allSpaces = [];
		var size = this.size;

		_.times(size, function(i) {
			_.times(size, function(j) {
				allSpaces.push([i,j]);
			});
		});

		return twoDimArrayDifference(allSpaces, this.snake.body);
	}


	/* Utility Methods */

	function areEqualArrays(array1, array2) {
		var sameLength = array1.length == array2.length;
		var equalElements = true;

		for(var i = 0, len = array1.length; i < len; i++) {
			if (array1[i] !== array2[i]) {
				equalElements = false;
			}
		}

		return sameLength && equalElements;
	} 

	function includes(array, element) {
		var includes = false;
		for (var i = 0, len = array.length; i < len; i++) {
			if(areEqualArrays(array[i], element)) {
				includes = true;
			}
		}

		return includes;
	}

	function twoDimArrayDifference(array1, array2) {
		var diffArray = [];
		_.each(array1, function(elem) {
			if (!includes(array2, elem)) {
				diffArray.push(elem);
			}
		});

		return diffArray;
	}

	return Board
})();

