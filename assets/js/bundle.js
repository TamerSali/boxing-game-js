const runGame = document.querySelector('.game');
const playerA = document.querySelector('#player1');
const playerB = document.querySelector('#player2');
const playerScore = { scorePlayerA: 0, scorePlayerB: 0 };
const playerControls = {
	player1: {
		Attack: 'KeyA',
		Defense: 'KeyS',
	},
	player2: {
		Attack: 'KeyK',
		Defense: 'KeyL',
	}
};
let defense;
let gameIsRunning = false;
let score = 0;

/**
 * Starts the game.
 *
 * @return {Void}
 */
const startGame = () => {
	const scoreTransition = document.querySelector('.player__score');

	setTimeout(() => {
		runGame.classList.add('is-running');
	}, 1000);

	scoreTransition.addEventListener('transitionend', () => {
		gameIsRunning = true;
	});
}

/**
 * Executes a function according to the pressed key.
 *
 * @param  {Object} e
 * @return {Void}
 */
const pressedKey = e => {

	Object.keys(playerControls).map(key => {
		if (gameIsRunning) {

			if (e.code === playerControls[key].Attack) {
				return key === 'player1'
					? attackPlayer(playerA, playerB, playerScore)
					: attackPlayer(playerB, playerA, playerScore)
			}

			if (e.code === playerControls[key].Defense) {
				return key === 'player1'
					? defensePlayer(playerA)
					: defensePlayer(playerB)
			}
		}
	});
}

/**
 * Calculates player score on every successful attack.
 * First player to get to 20 points wins.
 *
 * @param  {Object} puncherPlayer
 * @param  {Object} punchedPlayer
 * @param  {Object} playerScore
 * @return {Void}
 */
const attackPlayer = (puncherPlayer, punchedPlayer, playerScore) => {
	puncherPlayer.classList.toggle('is-attacking');
	let player__score = puncherPlayer.querySelector('.player__score');

	if (defense !== punchedPlayer) {
		score = puncherPlayer === playerA
			? ++playerScore.scorePlayerA
			: ++playerScore.scorePlayerB;
		player__score.textContent = score;
		punchedPlayer.classList.add('got-hit');
	}

	if (parseInt(player__score.textContent) === 20) {
		puncherPlayer.textContent = "You Win !"
		punchedPlayer.textContent = "You Lose !"
		punchedPlayer.classList.add('is-defeated');
		gameIsRunning = false;
	}

	setTimeout(() => {
		puncherPlayer.classList.remove('is-attacking');
		punchedPlayer.classList.remove('got-hit');
	}, 300);
}

/**
 * Sets a defensive player.
 *
 * @param  {Object} defendPlayer
 * @return {Void}
 */
const defensePlayer = defendPlayer => {
	defendPlayer.classList.toggle('is-defending');
	defense = defendPlayer;

	setTimeout(() => {
		defendPlayer.classList.remove('is-defending');
		defense = undefined;
	}, 300);
}

window.addEventListener('DOMContentLoaded', startGame);

document.addEventListener('keyup', pressedKey);