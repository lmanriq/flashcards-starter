const Game = require('../src/Game');
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

    if(!round.returnCurrentCard()) {
      round.endRound();
      // try {
      //   let newDeck = round.newRound();
      //   let newRound = new Round(newDeck);
      //   let newGame = new Game();
      //   console.log(`You got ${round.incorrectGuesses.length} questions wrong. You will now have the chance to re-answer those questions.`);
      //   newGame.start();
      // }
      // catch(error) {
      //   console.error(error);
      // }
    } else {
      main(round);
    }
}

module.exports.main = main;
