const Deck = require('../src/Deck');
const Round = require('../src/Round');

const data1 = require('./data');
const data2 = require('./data2');
const prototypeQuestions1 = data1.prototypeData;
const prototypeQuestions2 = data2.prototypeData2;

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
  let dataSet = prototypeQuestions1;

  if(!round.returnCurrentCard() && round.incorrectGuesses.length) {
    round.endRound();
    console.log(`You got ${round.incorrectGuesses.length} questions wrong. You will now have the chance to re-answer those questions.`);
    round = makeNewRound(round.findIncorrectCards(dataSet));
    main(round);
  } else if (!round.returnCurrentCard()) {
    round.endRound();
    console.log('Congrats! You answered all questions correctly!');
    round = makeNewRound(prototypeQuestions2);
    dataSet = prototypeQuestions2;
    main(round);
  } else {
    main(round);
  }
}

module.exports.main = main;
