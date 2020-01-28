const Deck = require('../src/Deck');
const Round = require('../src/Round');

const data = require('./data');
const prototypeQuestions = data.prototypeData;

const inquirer = require('inquirer');

const genList = (round) => {
  let card = round.returnCurrentCard();

  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));
  const game = require('../index.js');

  if(!round.returnCurrentCard() && round.incorrectGuesses.length) {
    round.endRound();
    const newGame = game.game;
    newGame.cards = round.findIncorrectCards();
    newGame.deck = new Deck(newGame.cards);
    newGame.currentRound = new Round(newGame.deck);
    newGame.start(newGame.cards, newGame.deck, newGame.currentRound);
    console.log(`You got ${round.incorrectGuesses.length} questions wrong. You will now have the chance to re-answer those questions.`);
  } else if (!round.returnCurrentCard()) {
    round.endRound();
    console.log('Congrats! You answered all questions correctly!')
  } else {
    main(round);
  }
}

module.exports.main = main;
