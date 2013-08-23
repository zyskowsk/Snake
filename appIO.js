SnakeGame.UI = (function () {

	var STEP_TIME_MILLIS = 150;

	function UI(size) {
		this.playing = true;
		this.paused = false;
		this.game = new SnakeGame.Game(30);
	}

	UI.prototype.newGame = function () {
		game = new SnakeGame.Game(30);
		playing = true;
		paused = false;
		this.clearBoard();
		this.render();
		this.update();
		this.listen();
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
		var size = this.game.board.size;
		$(function () {
			$('.boardPiece').removeClass('snake').removeClass('apple');
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
					that.newGame();
					that.pause();
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
					} else {
						that.pause();
						paused = true;
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

		if (this.game.over) {
			$(function () {
				$('body').append("<p> GAME OVER </p>");
			})
			this.newGame();
			this.pause();
		} else {
			this.game.step();
			this.update();
		}

		return this.playing;
	}

	UI.prototype.run = function () {
		console.log(this);
		stepTimer = window.setInterval(this.runStep.bind(this), STEP_TIME_MILLIS);
	}

	return UI;
})();


gameUI = new SnakeGame.UI(30);
gameUI.newGame();


