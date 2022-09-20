'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

//holding data
let scores;
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const init = function () {
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
};
init();

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling dice function
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1.generate a number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.dispaly dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Chceck for rolled 1: if true switch players
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  //player has to roll dice at least one time
  if (currentScore === 0) return;

  if (isPlaying) {
    //add current score to score of active player
    scores[activePlayer] += currentScore;
    console.log(`current score ${currentScore}
    current1 ${current0El.textContent}
    current2 ${current1EL.textContent}
    score1 ${score0El.textContent}
    score2 ${score1El.textContent}
    scores1 ${scores[0]}
    scores2 ${scores[1]}`);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score is at least 200
    if (scores[activePlayer] >= 200) {
      diceEl.classList.add('hidden');
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch the player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
