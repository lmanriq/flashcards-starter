const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

const data = require('./data');
const data2 = require('./data2');
const prototypeQuestions = data.prototypeData;
const prototypeQuestions2 = data2.prototypeData2;
const inquirer = require('inquirer');
let roundCount = 0;

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

const makeNewRound = (cards) => {
  const newCards = cards;
  const newDeck = new Deck(newCards);
  const newRound = new Round(newDeck);
  return newRound;
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

  if(!round.returnCurrentCard() && round.incorrectGuesses.length) {
    round.endRound();
    console.log(`You got ${round.incorrectGuesses.length} questions wrong. You will now have the chance to re-answer those questions.`);
    round = makeNewRound(round.findIncorrectCards(roundCount));
    main(round);
  } else if (!round.returnCurrentCard() && roundCount === 0) {
    round.endRound();
    console.log('Congrats! You answered all questions correctly!');
    roundCount++;
    const secondSetOfCards = prototypeQuestions2.map(card => {
      card = new Card(card.id, card.question, card.answers, card.correctAnswer);
      return card;
    });
    round = makeNewRound(secondSetOfCards);
    main(round);
  } else if (!round.returnCurrentCard() && roundCount === 1) {
    round.endRound();
    console.log('Congrats! You answered all questions correctly for all data sets!');
  } else {
    main(round);
  }
}

module.exports.main = main;
