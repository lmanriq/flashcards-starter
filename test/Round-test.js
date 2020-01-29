const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Card = require('../src/Card');
const Deck = require('../src/Deck');

describe('Round', function() {
  let card1, card2, card3, deck, round;

  beforeEach(function() {
    card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    deck = new Deck([card1, card2, card3]);
    round = new Round(deck);
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should store a deck of cards', function() {
    expect(round.deck).to.deep.equal([card1, card2, card3]);
  });

  it('should be able to return its current card', function() {
    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should be able to take turns', function() {
    expect(round.turns).to.equal(0);
    expect(round.incorrectGuesses).to.deep.equal([])
    expect(round.returnCurrentCard()).to.equal(card1);
    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.takeTurn('spleen')).to.equal('incorrect!');
    expect(round.turns).to.equal(2);
    expect(round.incorrectGuesses).to.deep.equal([14]);
    expect(round.returnCurrentCard()).to.equal(card3);
  });

  it('should be able to calculate the percentage of currect guesses', function() {
    round.takeTurn('sea otter');
    round.takeTurn('spleen');
    expect(round.calculatePercentCorrect()).to.equal(50);
  });

  it('should be able to end a round', function() {
    round.takeTurn('sea otter');
    round.takeTurn('spleen');
    round.takeTurn('Fitzgerald');
    const percentCorrect = round.calculatePercentCorrect();
    expect(round.endRound()).to.equal(`** Round over! ** You answered ${percentCorrect}% of the questions correctly!`);
  });
});
