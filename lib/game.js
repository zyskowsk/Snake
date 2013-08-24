SnakeGame.Game = (function () {
	
	function Game(size) {
		this.board = new SnakeGame.Board(size);
		this.snake = this.board.snake;
		this.over = false;
		this.size = size;
		this.placeFood();
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

	return Game;
})();