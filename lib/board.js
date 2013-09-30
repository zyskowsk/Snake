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

		return SnakeGame.Utilities.arrayDifference(allSpaces, this.snake.body);
	}

	return Board;
})();