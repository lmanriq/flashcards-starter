const http = require('http');
let app = http.createServer();
const Game = require('./src/Game');
const Round = require('./src/Round');
const Deck = require('./src/Deck');
// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
const game = new Game();

game.start();

exports.game = game;
