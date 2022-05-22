'use strict';

//ELEMENTS

let score = document.querySelectorAll('.score');
const main = document.querySelector('main');
const dice = document.querySelector('.dice');
const diceImg = document.querySelector('img');
const currentScore = document.querySelectorAll('.current-score');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentPlayerOne = document.querySelector('#current--0');
let currentPlayerTwo = document.querySelector('#current--1');
let scorePlayerOne = document.querySelector('#score--0');
let scorePlayerTwo = document.querySelector('#score--1');
let newGame = document.querySelector('.btn--new');
const playerActive = document.querySelector('.player--active');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//FUNCTION

const startGame = () => {
  for (let i = 0; i < score.length; i++) {
    Number((score[i].textContent = 0));
  }
  diceImg.remove();
  for (let i = 0; i < currentScore.length; i++) {
    Number((currentScore[i].textContent = 0));
  }
};

function changeImage(a) {
  diceImg.src = a;
}

//ACTIONS

startGame();
let current1 = 0;
let total1 = 0;
let current2 = 0;
let total2 = 0;
let holdTotal1 = 0;
let holdTotal2 = 0;
let playing = true;

btnRollDice.addEventListener('click', () => {
  if (playing === true) {
    let diceRoll = Math.floor(Math.random() * 6 + 1);

    if (player0.classList.contains('player--active')) {
      current1 = Number((currentPlayerOne.textContent = diceRoll));
      total1 += current1;
      holdTotal1 += current1;
      Number((currentPlayerOne.textContent = total1));
    } else if (player1.classList.contains('player--active')) {
      current2 = Number((currentPlayerTwo.textContent = diceRoll));
      total2 += current2;
      holdTotal2 += current2;
      Number((currentPlayerTwo.textContent = total2));
    }

    main.appendChild(diceImg);

    if (diceRoll === 1) {
      changeImage('dice-1.png');
      if (player0.classList.contains('player--active')) {
        total1 = 0;
        Number((currentPlayerOne.textContent = total1));
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
        holdTotal1 = 0;
      } else if (player1.classList.contains('player--active')) {
        total2 = 0;
        Number((currentPlayerTwo.textContent = total2));
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
        holdTotal2 = 0;
      }
    } else if (diceRoll !== 1) {
      changeImage(`dice-${diceRoll}.png`);
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing === true) {
    if (player0.classList.contains('player--active')) {
      scorePlayerOne.textContent = holdTotal1;
      total1 = 0;
      Number((currentPlayerOne.textContent = total1));
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else if (player1.classList.contains('player--active')) {
      scorePlayerTwo.textContent = holdTotal2;
      total2 = 0;
      Number((currentPlayerTwo.textContent = total2));
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }

    if (Number(scorePlayerOne.textContent) >= 20) {
      playing = false;
      player0.classList.add('player--winner');
      diceImg.remove();
    } else if (Number(scorePlayerTwo.textContent) >= 20) {
      playing = false;
      player1.classList.add('player--winner');
      diceImg.remove();
    }
  }
});

newGame.addEventListener('click', () => {
  playing = true;
  startGame();
  total1 = 0;
  total2 = 0;
  holdTotal1 = 0;
  holdTotal2 = 0;
  scorePlayerOne.textContent = 0;
  scorePlayerTwo.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player1.classList.remove('player--winner', 'name');
  player0.classList.remove('player--winner', 'name');
});
