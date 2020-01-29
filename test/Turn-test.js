const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function() {
  let card, turn;

  beforeEach(function() {
    card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    turn = new Turn('object', card);
  });

  it('should be a function', function() {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    expect(turn).to.be.an.instanceof(Turn);
  });

  it('should store a guess', function() {
    expect(turn.guess).to.equal('object');
  });

  it('should store a Card', function() {
    expect(turn.card).to.equal(card);
  });

  it('should be able to return a guess', function() {
    expect(turn.returnGuess()).to.equal(turn.guess);
  });

  it('should be able to return a Card', function() {
    expect(turn.returnCard()).to.equal(turn.card);
  });

  it('should be able to determine if a guess is correct', function() {
    expect(turn.evaluateGuess()).to.equal(true);
  });

  it('should provide feedback on a guess', function() {
    const turn1 = new Turn('array', card);
    const turn2 = new Turn('object', card);
    expect(turn1.giveFeedback()).to.equal('incorrect!');
    expect(turn2.giveFeedback()).to.equal('correct!');
  });
});
