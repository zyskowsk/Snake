SnakeGame.UI = (function () {

	var STEP_TIME_MILLIS = 75;

	function UI(size) {
		this.playing = true;
		this.paused = false;
		this.started = false;
		this.game = new SnakeGame.Game(size)
	}


	UI.prototype.clearBoard = function () {
		$('.boardPiece').remove();
	}

	UI.prototype.drawApple = function () {
		var apple = this.game.currentFoodPos;

		$(function () {
			$("#piece_" + apple[0] + "_" + apple[1]).addClass('apple');
		});
	}
	
	UI.prototype.drawSnake = function () {
	  var len = this.game.board.snake.length,
	  	  body = this.game.board.snake.body;

		$(function() {
			_.each(body, function(pos) {
				var x = pos[0],
						y = pos[1];
				var piece = $("#piece_" + x + "_" + y).addClass('snake');
			});
		});
	}

	UI.prototype.listen = function () {

		var that = this;

		var keydownDebounce = _.debounce(function (event) {
			switch(event.keyCode) {
				case 82:
					location.reload();
					break;
				case 83:
					if (that.started === false) {
						that.run();
						that.started = true;
					}
					break;
				case 37:
					if (!that.game.snake.isOppositeDirection('west')) {
					  that.game.snake.turn('west');
					} 
					break;
				case 38:
					if (!that.game.snake.isOppositeDirection('north')) {
					  that.game.snake.turn('north');
					} 
					break;
				case 39:
					if (!that.game.snake.isOppositeDirection('east')) {
					  that.game.snake.turn('east');
					} 
					break;
				case 40:
					if (!that.game.snake.isOppositeDirection('south')) {
					  that.game.snake.turn('south');
					} 
					break;
				case 80:
					if (that.paused) {
						that.run();
						that.paused = false;
						$('.message').html("");
					} else {
						that.pause();
						$('.message').html("PAUSED");
						that.paused = true;
					}
					break;
				default:
					break;
			}
		}, 50);

		$('html').keydown(keydownDebounce);
	}

	UI.prototype.pause = function () {
		window.clearInterval(stepTimer);
	}

	UI.prototype.render = function () {
		var size = this.game.board.size;
		$(function () {
			for (i = 0; i < size; i++) {
				for(j = 0; j < size; j++) {
						$('.board').append(
									"<div class=boardPiece id=piece_" + i + "_" + j + "></div>");
				}
			}
		});
	}

	UI.prototype.run = function () {
		stepTimer = window.setInterval(this.runStep.bind(this), STEP_TIME_MILLIS);
	}

	UI.prototype.runStep = function () {
		var that = this

		if (this.game.over) {
			$('.message').html("GAME OVER");
		} else {
			this.game.step();
			this.update();
		}
	}

	UI.prototype.score = function () {
		return (this.game.snake.body.length - 3) * 5;
	}

	UI.prototype.startGame = function () {
		playing = true;
		paused = false;
		this.clearBoard();
		this.render();
		this.update();
		this.listen();
	}

	UI.prototype.update = function () {
		var that = this;
		var size = this.game.board.size;

		$(function() {
			$('.boardPiece').removeClass('snake').removeClass('apple');
			$('.score').html("Score: " + that.score());
		});

		this.drawSnake();
		this.drawApple();
	}

	return UI;
})();