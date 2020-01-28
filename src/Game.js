const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = '';
    this.cards = [];
    this.deck = '';
    this.incorrectCards = '';
  }

  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  async printQuestion(round) {
    console.log('1')
    await util.main(round);
    console.log('2')
    this.newRound();
  }

  start() {
    this.cards = prototypeQuestions.map(card => {
      card = new Card(card.id, card.question, card.answers, card.correctAnswer);
      return card;
    });
    this.deck = new Deck(this.cards);
    this.currentRound = new Round(this.deck);
    this.printMessage(this.deck);
    this.printQuestion(this.currentRound);
  }

  newRound() {
    this.incorrectCards = this.currentRound.incorrectGuesses.map(guess => {
      const targetQuestion = prototypeQuestions[(guess + 1)];
      guess = new Card (targetQuestion.id, targetQuestion.question, targetQuestion.answers, targetQuestion.correctAnswer);
      return guess;
    });
    let newDeck = new Deck(this.incorrectCards);
    this.currentRound = new Round(newDeck);
    this.printMessage(newDeck);
    this.printQuestion(this.currentRound);
  }
}

module.exports = Game;
