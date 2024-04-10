import test from 'ava';
import { createNewGame, playerHit, playerHold } from '../gameService.js';
import Game, { GAME_STATE } from '../../game/game.js';
import DeckFactory from '../../game/deckFactory.js';
import TrickPlayerWinsDeckFactory from '../../game/tests/helpers/trickPlayerWinsDeckFactory.js';

test('can create a game and returns a plain object representation', (t) => {
  const game = createNewGame('Test Player');

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.dealer.hand.length, 2);
  t.false(game instanceof Game);
});

test('player can hit', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', DeckFactory);

  playerHit(game);

  t.is(game.player.hand.length, 3);
});

test('player can hold', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickPlayerWinsDeckFactory);

  playerHold(game);

  t.is(game.state, GAME_STATE.GAME_OVER);
});
