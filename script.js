window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas-1');
	const ctx = canvas.getContext('2d');
	canvas.width = 500;
	canvas.height = 500;

	class InputHandler {
		constructor(game) {
			this.game = game;
			window.addEventListener('keydown', e => {
				if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !this.game.keys.includes(e.key)) {
					this.game.keys.push(e.key);
				}
				console.log(this.game.keys);
			});

			window.addEventListener('keyup', e => {
				const index = this.game.keys.indexOf(e.key);
				if (index !== -1) {
					this.game.keys.splice(index, 1);
				}
				console.log(this.game.keys);
			})
		}
	}

	class Projectile {
		/**
		 * @param {Game} game
		 * @param {number} x
		 * @param {number} y
		 */
		constructor(game, x, y) {
			this.game = game;
			this.x = x;
			this.y = y;
		}
	}

	class Particle {}

	class Player {
		/**
		 * @param {Game} game
		 */
		constructor(game) {
			this.game = game;
			this.width = 120;
			this.height = 190;
			this.x = 20;
			this.y = 100;
			this.speedY = 0;
			this.maxSpeed = 2;
		}

		update() {
			if (this.game.keys.includes('ArrowUp')) {
				this.speedY = -this.maxSpeed;
			} else if (this.game.keys.includes('ArrowDown')) {
				this.speedY = this.maxSpeed;
			} else {
				this.speedY = 0;
			}

			this.y += this.speedY;
		}

		/**
		 * @param {CanvasRenderingContext2D} context
		 */
		draw(context) {
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	class Enemy {}

	class Layer {}

	class Background {}

	class UI {}

	class Game {
		/**
		 * @param {number} width
		 * @param {number} height
		 */
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.keys = [];
		}

		update() {
			this.player.update();
		}

		/**
		 * @param {CanvasRenderingContext2D} context
		 */
		draw(context) {
			this.player.draw(context);
		}
	}

	const game = new Game(canvas.width, canvas.height);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.update();
		game.draw(ctx);
		requestAnimationFrame(animate);
	}

	animate();
});
