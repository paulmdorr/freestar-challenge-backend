import test from 'ava';
import Game, { GAME_STATE } from '../game.js';
import { WINNER_TYPE } from '../pointsRule.js';
import DeckFactory from '../deckFactory.js';
import TrickBustDeckFactory from '../helpers/trickBustDeckFactory.js';
import TrickNaturalBlackjackDeckFactory from '../helpers/trickNaturalBlackjackDeckFactory.js';

test('can create a game', (t) => {
  const game = new Game('Test Player', DeckFactory);

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.dealer.hand.length, 2);
  t.is(game.state, GAME_STATE.PLAYER_TURN);
});

test('player can hit', (t) => {
  const game = new Game('Test Player', DeckFactory);

  game.playerHit();

  t.is(game.player.hand.length, 3);
});

test('player can hold', (t) => {
  const game = new Game('Test Player', DeckFactory);

  game.playerHold();

  t.is(game.player.hand.length, 2);
  t.is(game.state, GAME_STATE.DEALER_TURN);
});

test('game was just created and player has a blackjack', (t) => {
  const game = new Game('Test Player', TrickNaturalBlackjackDeckFactory);

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.PLAYER);
});

test('player hits and busts', (t) => {
  const game = new Game('Test Player', TrickBustDeckFactory);

  game.playerHit();

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.DEALER);
});
