const chai = require('chai');
const expect = chai.expect;

const Game = require('../src/Game');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Game', function() {
  let game;

  beforeEach(function() {
    game = new Game();
  });

  it('should be a function', function() {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', function() {
    expect(game).to.be.an.instanceof(Game);
  });

  it('should start with no cards, an empty deck, and no rounds', function() {
    expect(game.currentRound).to.equal('');
    expect(game.cards).to.deep.equal([]);
    expect(game.deck).to.equal('');
  });

  it('should keep track of the current round', function() {
    game.start();
    expect(game.currentRound).to.be.an.instanceof(Round);
  });

  it('should allow players to start a game to create cards and a deck', function() {
    game.start();
    game.cards.forEach(card => expect(card).to.be.an.instanceof(Card));
    expect(game.deck).to.be.an.instanceof(Deck);
  });
});
