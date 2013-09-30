SnakeGame.Game = (function () {
	
	function Game(size) {
		this.board = new SnakeGame.Board(size);
		this.snake = this.board.snake;
		this.over = false;
		this.size = size;
		this.placeFood();
	}

	Game.prototype.isEndingMove = function (pos) {
		var isSnakePiece = false,
		    body = this.snake.body,
		    size = this.board.size,
		    isSnakePiece = SnakeGame.Utilities.includes(body, pos);
		    isPerpCollision = this._isPerpCollision(pos),
		    isOffBoard = (pos[0] >= size || pos[0] < 0 ||
						pos[1] >= size || pos[1] < 0);

		return isOffBoard || (isSnakePiece && isPerpCollision);
	}
	
	Game.prototype.isFoodAhead = function () {
		var food = this.currentFoodPos,
		    nextPos = this.snake.lookAhead();
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

	Game.prototype._isPerpCollision = function (pos) {
		var body = this.snake.body,
		    dir = this.snake.currentDirection;

    if (SnakeGame.Utilities.includes(body, pos)) {
    	var idx = SnakeGame.Utilities.arrayIndex(body, pos),
					snakeVec = SnakeGame.Utilities.dirVector(body[idx], body[idx + 1]);

			return (snakeVec[0] * dir[0] + snakeVec[1] * dir[1]) === 0;
		} else {
			return false; 
		}
	}

	return Game;
})();