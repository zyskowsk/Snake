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

	/*******************
	 * Utility Methods *
	 *******************/
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