const data = require('./data');
const prototypeQuestions = data.prototypeData;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currentCard = this.deck[this.turns]
  }

  returnCurrentCard() {
    this.currentCard = this.deck[this.turns];
    return this.currentCard;
  }

  takeTurn(guess) {
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
    return Math.floor(100 - percentIncorrect);
  }

  endRound() {
    const percentCorrect = this.calculatePercentCorrect();
    const message = `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`
    console.log(message);
    return(message);
  }

  findIncorrectCards() {
    let incorrectCards = this.incorrectGuesses.map(guess => {
      const targetQuestion = prototypeQuestions[guess - 1];
      guess = new Card (targetQuestion.id, targetQuestion.question, targetQuestion.answers, targetQuestion.correctAnswer);
      return guess;
    });
    return incorrectCards;
  }
}

module.exports = Round;
