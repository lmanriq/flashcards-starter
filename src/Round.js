const data = require('./data');
const prototypeQuestions = data.prototypeData;
const data2 = require('./data2');
const prototypeQuestions2 = data2.prototypeData2;
const {performance} = require('perf_hooks');

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currentCard = this.deck[this.turns];
    this.startTime = 0;
    this.endTime = 0;
  }

  returnCurrentCard() {
    this.currentCard = this.deck[this.turns];
    return this.currentCard;
  }

  takeTurn(guess) {
    if (!this.turns) {
      this.startTime = performance.now();
    }
    const currentTurn = new Turn(guess, this.currentCard);
    if (!currentTurn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentCard.id);
    }
    this.turns++;
    this.currentCard = this.deck[this.turns];
    return currentTurn.giveFeedback();
  }

  calculatePercentCorrect() {
    let percentIncorrect = this.incorrectGuesses.length / this.turns * 100;
    return Math.round(100 - percentIncorrect);
  }

  endRound() {
    this.endTime = performance.now();
    const timeElapsed = this.endTime - this.startTime;
    const mins = Math.floor(timeElapsed / 60000);
    const secs = Math.floor(timeElapsed / 1000) - (mins * 60);
    const percentCorrect = this.calculatePercentCorrect();
    const message = `** Round over! ** You answered ${percentCorrect}% of the questions correctly! \n It took you ${mins} mins and ${secs} secs to complete.`
    console.log(message);
    return(message);
  }

  findIncorrectCards(round) {
    let dataSet;
    if (round === 1) {
      dataSet = prototypeQuestions;
    } else {
      dataSet = prototypeQuestions2;
    }
    let incorrectCards = this.incorrectGuesses.map(guess => {
      const targetQuestion = dataSet[guess - 1];
      guess = new Card (targetQuestion.id, targetQuestion.question, targetQuestion.answers, targetQuestion.correctAnswer);
      return guess;
    });
    return incorrectCards;
  }
}

module.exports = Round;
