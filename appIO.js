$(function() {
	$('body').append("<div class=board></div>");
});

STEP_TIME_MILLIS = 150;
var stepTimer;
newGame();
listen();

function newGame() {
	game = new SnakeGame.Game(30);
	playing = true;
	paused = false;
	clearBoard();
	render();
	update();
}

function render() {
	var size = game.board.size;
	$(function () {
		for (i = 0; i < size; i++) {
			for(j = 0; j < size; j++) {
					$('.board').append(
								"<div class=boardPiece id=piece_" + i + "_" + j + "></div>");
			}
		}
	});
}

function update() {
	var size = game.board.size;
	$(function () {
		$('.boardPiece').removeClass('snake').removeClass('apple');
	});

	drawSnake();
	drawApple();
}

function clearBoard() {
	$(function () {
		$('.boardPiece').remove();
	});
}

function drawSnake() {
  var len = game.board.snake.length,
  	  body = game.board.snake.body;

	$(function() {
		_.each(body, function(pos) {
			var x = pos[0],
					y = pos[1];
			var piece = $("#piece_" + x + "_" + y).addClass('snake');
		});
	});
}

function drawApple() {
	var apple = game.currentFoodPos;

	$(function () {
		$("#piece_" + apple[0] + "_" + apple[1]).addClass('apple');
	});
}

function listen() {
	$('html').keydown(function (event) {
		switch(event.keyCode) {
			case 82:
				newGame();
				pause();
				break;
			case 83:
				run();
				break;
			case 37:
				game.snake.turn('west');
				break;
			case 38:
				game.snake.turn('north');
				break;
			case 39:
				game.snake.turn('east');
				break;
			case 40:
				game.snake.turn('south');
				break;
			case 80:
				if (paused) {
					run();
					paused = false;
				} else {
					pause();
					paused = true;
				}
				break;
			default:
				console.log("something else happend");
				console.log(event.keyCode);
				break;
		}
	});
}

function pause() {
	window.clearInterval(stepTimer);
}

function run_step() {

	$(function() {
		if (game.over) {
			$('body').append("<p> GAME OVER </p>");
			newGame();
			pause();
		} else {
			game.step();
			update();
			console.log(game.currentFoodPos);
		}
	});

	return playing;
}

function run() {
	stepTimer = window.setInterval(run_step, STEP_TIME_MILLIS);
}



