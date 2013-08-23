SnakeGame.UI = (function () {

	var STEP_TIME_MILLIS = 100;

	function UI(size) {
		this.playing = true;
		this.paused = false;
		this.game = new SnakeGame.Game(size)
	}

	UI.prototype.newGame = function () {
		playing = true;
		paused = false;
		this.clearBoard();
		this.render();
		this.update();
		this.listen();
	}

	UI.prototype.score = function () {
		return (this.game.snake.body.length - 3) * 5;
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

	UI.prototype.update = function () {
		var that = this;
		var size = this.game.board.size;
		$(function () {
			$('.boardPiece').removeClass('snake').removeClass('apple');
		});

		$(function () {
			$('.score').html("Score: " + that.score());
		});

		this.drawSnake();
		this.drawApple();
	}

	UI.prototype.clearBoard = function () {
		$(function () {
			$('.boardPiece').remove();
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

	UI.prototype.drawApple = function () {
		var apple = this.game.currentFoodPos;

		$(function () {
			$("#piece_" + apple[0] + "_" + apple[1]).addClass('apple');
		});
	}

	UI.prototype.listen = function () {
		var that = this;

		$('html').keydown(function (event) {
			switch(event.keyCode) {
				case 82:
					location.reload();
					break;
				case 83:
					that.run();
					break;
				case 37:
					that.game.snake.turn('west');
					break;
				case 38:
					that.game.snake.turn('north');
					break;
				case 39:
					that.game.snake.turn('east');
					break;
				case 40:
					that.game.snake.turn('south');
					break;
				case 80:
					if (that.paused) {
						that.run();
						that.paused = false;
						$(function() {
							$('.message').html("");
						});
					} else {
						that.pause();
						$(function() {
							$('.message').html("PAUSED");
						});
						that.paused = true;
					}
					break;
				default:
					break;
			}
		});
	}

	UI.prototype.pause = function () {
		window.clearInterval(stepTimer);
	}

	UI.prototype.runStep = function () {
		var that = this

		if (this.game.over) {
			$(function () {
				$('.message').html("GAME OVER");
			});
			new SnakeGame.UI(30);
		} else {
			this.game.step();
			this.update();
		}
	}

	UI.prototype.run = function () {
		stepTimer = window.setInterval(this.runStep.bind(this), STEP_TIME_MILLIS);
	}

	return UI;
})();


game = new SnakeGame.UI(30);
game.newGame();


