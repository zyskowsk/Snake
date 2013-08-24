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

	Snake.prototype.eat = function() {
		var nextPos = this.lookAhead();
		this.body.push(nextPos);
	}

	Snake.prototype.head = function() {
		return this.body.slice(-1)[0];
	}

	Snake.prototype.isOppositeDirection = function(direction) {
		return ((COMPASS[direction][0] === this.currentDirection[0]) ||
					   (COMPASS[direction][1] === this.currentDirection[1]));
	}
	
	Snake.prototype.lookAhead = function() {
		var dir = this.currentDirection;
		var nextPos = [this.head()[0] + dir[0], this.head()[1] + dir[1]];

		return nextPos;
	}

	Snake.prototype.move = function() {
		var newHead = this.lookAhead();

		this.body.shift();
		this.body.push(newHead);
	}

	Snake.prototype.turn = function(newDirection) {
		this.currentDirection = COMPASS[newDirection];
	}

	return Snake;
})();