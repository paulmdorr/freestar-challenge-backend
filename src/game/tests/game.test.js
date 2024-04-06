import test from 'ava';
import Game, { GAME_STATE } from '../game.js';
import { WINNER_TYPE } from '../pointsRule.js';
import DeckFactory from '../deckFactory.js';
import TrickDeckFactory from '../helpers/trickDeckFactory.js';

test('can create a game', (t) => {
  const game = new Game('Test Player', DeckFactory.createDeck());

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.dealer.hand.length, 2);
  t.is(game.state, GAME_STATE.PLAYER_TURN);
});

test('player can hit', (t) => {
  const game = new Game('Test Player', DeckFactory.createDeck());

  game.playerHit();

  t.is(game.player.hand.length, 3);
});

test('player can hold', (t) => {
  const game = new Game('Test Player', DeckFactory.createDeck());

  game.playerHold();

  t.is(game.player.hand.length, 2);
  t.is(game.state, GAME_STATE.DEALER_TURN);
});

test('game was just created and player has a blackjack', (t) => {
  const game = new Game('Test Player', TrickDeckFactory.createDeck());

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.PLAYER);
});
